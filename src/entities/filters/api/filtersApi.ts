import { useQuery } from '@tanstack/react-query';
import { getFilterHandlersHandlers } from './msw/getFiltersHandlers';

export type Filters = {
  name: string;
};

export const filterKeys = {
  filters: {
    root: ['filters'],
    global: () => [...filterKeys.filters.root, 'global'],
  },
};

export const useGlobalFilters = () =>
  useQuery<Filters[], Filters[], Filters[]>({
    queryKey: filterKeys.filters.global(),
    queryFn: async () => {
      const response = await getFilterHandlersHandlers()
      return response.data.data as Filters[];
    },
  });
