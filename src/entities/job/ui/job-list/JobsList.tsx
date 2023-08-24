import { ReactNode } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { Job } from '../../api/jobApi';

type JobsListProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: null;
  hasNextPage?: boolean;
  infinityJobs?: InfiniteData<Job[]>;
  renderJobs: (job: Job) => ReactNode;
  nextPageAction: ReactNode;
};

export function JobsList(props: JobsListProps) {
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    hasNextPage,
    infinityJobs,
    renderJobs,
    nextPageAction,
  } = props;

  return (
    <>
      {isLoading && <div className="job-preview">Loading jobs...</div>}

      {isSuccess &&
        !hasNextPage &&
        infinityJobs!.pages.length === 1 &&
        infinityJobs!.pages[0].length === 0 && (
          <div className="job-preview">No jobs are here... yet.</div>
        )}

      {isSuccess &&
        infinityJobs!.pages.map((group) => group.map(renderJobs))}

      {hasNextPage && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {nextPageAction}
        </div>
      )}
    </>
  );
}
