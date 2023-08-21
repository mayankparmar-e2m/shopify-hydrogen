import {useLocation, useNavigate, useSearchParams} from '@remix-run/react';
import {
  generateFilterUrlFromSelectedFilters,
  getFilterLink,
} from '~/utils/utils';

export default function FilterValues({
  onSetSelectedFilters,
  selectedFilters,
  filterValues = [],
  filter,
  appliedFilters = [],
}) {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const filterURL = (filterType, singlefilter) => {
    const {selectedFilters: selectedFiltersArray, url} =
      generateFilterUrlFromSelectedFilters(singlefilter, selectedFilters);
    onSetSelectedFilters(selectedFiltersArray);
  };
  return (
    <div className="filter-values md:absolute rounded-lg px-6 md:p-3 md:border border-solid border-primary bg-white z-10 min-w-max">
      <ul className="filter-value_wrapper">
        {filterValues.map((filterValue) => {
          const activeFilter =
            selectedFilters.findIndex(
              (item) => item.label === filterValue.label,
            ) >= 0 ||
            appliedFilters.findIndex(
              (item) => item.label === filterValue.label,
            ) >= 0;
          const to = getFilterLink(filter, filterValue.input, params, location);
          return (
            <li
              key={to}
              onClick={() => {
                navigate(to);
              }}
              className={`${
                filterValue.count <= 0 && 'opacity-50'
              } flex items-center mb-1 gap-2 justify-between`}
            >
              <span
                className={`text-accent text-xs  leading-relaxed tracking-tight ${
                  activeFilter ? 'font-bold' : 'font-normal'
                }`}
              >
                {filterValue.label}
              </span>
              <span
                className={`text-accent text-xs  leading-relaxed tracking-tight ${
                  activeFilter ? 'font-bold' : 'font-normal'
                }`}
              >
                ({filterValue.count})
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
