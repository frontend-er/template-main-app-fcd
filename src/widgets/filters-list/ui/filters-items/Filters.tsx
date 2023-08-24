import { filtersApi } from '~entities/filters';

type FiltersItemsProps = {
  onFilterClick: (filter: string) => void;
};

export function FiltersItems(props: FiltersItemsProps) {
  const { onFilterClick } = props;

  const { data: filters, isLoading } = filtersApi.useGlobalFilters();


  return (
    <div className="sidebar">
      <p>Filters</p>
      <div className="filter-list">
        {isLoading && 'Loading filters...'}

        {filters &&
          filters.length &&
          filters.map((filter) => {
            return (
              <button
                key={filter.name}
                className="filter-pill filter-default"
                type="button"
                onClick={() => {
                  onFilterClick(filter.name.replace('_', ' '));
                }}
              >
                {filter.name.replace('_', ' ')}
              </button>
            )
          })}
      </div>
    </div>
  );
}
