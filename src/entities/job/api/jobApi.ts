import {
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';

import { BASE_JOBS_URL } from '~shared/api/msw/config/constants';


export interface Job {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
  favoritesCount: number;
  username: string;
}

export interface JobDto extends Job {
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export function mapJob(jobDto: JobDto): Job {
  const { username, ...job } = jobDto;
  return {
    username,
    ...job,
  };
}

export type GlobalfeedQuery = {
  tag?: string;
  author?: string;
  favorited?: string;
  offset: number;
  limit: number;
};


export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
}

export type UserfeedQuery = {
  offset: number;
  limit: number;
};

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export const jobKeys = {
  jobs: {
    root: ['jobs'],
    globalfeed: {
      root: () => [...jobKeys.jobs.root, 'globalfeed'],
      query: (query: GlobalfeedQuery) => [
        ...jobKeys.jobs.globalfeed.root(),
        query,
      ],
    },
    userfeed: {
      root: () => [...jobKeys.jobs.root, 'userfeed'],
      query: (query: GlobalfeedQuery) => [
        ...jobKeys.jobs.userfeed.root(),
        query,
      ],
    },
  },

  job: {
    root: ['job'],
    slug: (slug: string) => [...jobKeys.job.root, slug],
  },

  mutation: {
    create: () => [...jobKeys.job.root, 'create'],
    delete: () => [...jobKeys.job.root, 'delete'],
    update: () => [...jobKeys.job.root, 'update'],
    favorite: () => [...jobKeys.job.root, 'favorite'],
    unfavorite: () => [...jobKeys.job.root, 'unfavorite'],
  },
};

type UseJobQuery = UseQueryOptions<
  Job,
  Job,
  string[]
>;
type UseJobQueryOptions = Omit<UseJobQuery, 'queryKey' | 'queryFn'>;

export const useGlobalInfinityJobs = (
  query: GlobalfeedQuery,
  params?: RequestParams,
) =>
  useInfinityJobs({
    queryKey: jobKeys.job.root,
    queryFn: async () => {
      const response = await axios.get(`${BASE_JOBS_URL}`, {});

      return mapJob(response.data);
    },
    query,
    params,
  });


const useInfinityJobs = ({
  queryKey,
  queryFn,
  query,
  params,
}: any) => {
  const { offset, limit } = query;

  return useInfiniteQuery<Job[], Job[], unknown[]>({
    queryKey,

    queryFn: async ({ pageParam = offset, signal }) => {
      const response: { data: { data: Job[] } } = await axios.get(`${BASE_JOBS_URL}`, {});

      if (query) {
        response.data.data = response.data.data.filter((job: Job) => {
          if (query.tag && !job.tagList.includes(query.tag.replace(' ', '_'))) return false;
          return true;
        });
        if (query.limit) response.data.data = response.data.data.slice(0, query.limit);
        if (query.offset) response.data.data = response.data.data.slice(query.offset, response.data.data.length);
      }

      return response.data.data.map(mapJob);
    },

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < limit) return null;

      const nextPageParam = lastPage.length ? pages.length * limit : null;

      return nextPageParam;
    },
  });
};


export const useJob = (
  slug: string,
  params?: RequestParams,
  options?: UseJobQueryOptions,
) =>
  useQuery<Job, Job, string[]>({
    queryKey: jobKeys.job.slug(slug),

    queryFn: async ({ signal }) => {
      const response: { data: { data: Job[] } } = await axios.get(`${BASE_JOBS_URL}`, { signal });
      const job = response.data.data.filter((job: Job) => job.slug === slug)[0];

      return mapJob(job);
    },
    ...options,
  });