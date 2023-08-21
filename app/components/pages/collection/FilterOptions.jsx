import {useLocation} from '@remix-run/react';
import {useEffect, useRef, useState} from 'react';
import {CloseIcon, DownIcon} from '~/components/global/Icons';
import FilterValues from './FilterValues';
import ActiveFilter from './ActiveFilter';
import useMediaQuery from '~/hook/useMediaQuery';

export default function FilterOptions({
  showMobileFilterPopup,
  filters = [],
  appliedFilters = [],
  onClosePopup,
}) {
  const wrapperRef = useRef(null);
  const {width} = useMediaQuery();
  const {search} = useLocation();
  const [selectedFilters, setSelectedFilters] = useState(appliedFilters);
  const [showSelectedFilterOption, setShowSelectedFilterOption] =
    useState(null);
  useEffect(() => {
    function handleDocumentClick(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSelectedFilterOption(null);
      }
    }
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [wrapperRef]);
  useEffect(() => {
    if (showSelectedFilterOption && width > 767) {
      setShowSelectedFilterOption(null);
    }
  }, [search]);
  const filterApply = () => {
    onClosePopup();
  };
  return (
    <>
      <div
        onClick={onClosePopup}
        className={` ${
          width < 767 && showMobileFilterPopup ? 'block' : 'hidden'
        } bg-mobile_backDrop_color fixed w-full h-full top-8 left-0 z-10`}
      ></div>
      <div
        className={`${
          width < 767 && showMobileFilterPopup
            ? 'block max-h-[520px] overflow-y-auto'
            : 'hidden'
        } filter-option-wrapper w-4/5 z-[11]  bg-white fixed md:static top-1/2 md:top-0 left-1/2 md:left-0 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:!flex md:items-center md:justify-between md:w-full md:flex-wrap md:gap-3 `}
        ref={wrapperRef}
      >
        <div className="flex items-center  md:hidden mobile-filter-footer   relative py-4 pl-4 pr-7 ">
          <CloseIcon onClick={onClosePopup} />{' '}
          <p className="uppercase text-primary absolute left-1/2 -translate-x-1/2">
            Filter By
          </p>
        </div>
        <ul className="md:flex md:items-center md:gap-5 ">
          {filters.map((filter) => {
            return (
              <li
                className="filter-option  mb-0 border-t   border-solid border-[rgba(222, 223, 223,0.6)] md:border-0 cursor-pointer md:relative"
                key={filter.id}
                onClick={() => setShowSelectedFilterOption(filter.id)}
              >
                <div className="flex items-center gap-2 px-6  py-5 md:p-0">
                  <span className=" text-primary uppercase md:capitalize md:text-accent text-xs font-normal leading-relaxed tracking-tight">
                    {' '}
                    {filter.label}
                  </span>
                  <span
                    className={` w-2  ${
                      showSelectedFilterOption === filter.id
                        ? 'transition-transform rotate-180'
                        : 'transition-transform rotate-0'
                    }`}
                  >
                    <DownIcon />
                  </span>
                </div>
                {showSelectedFilterOption === filter.id && (
                  <FilterValues
                    filter={filter}
                    filterValues={filter.values}
                    selectedFilters={selectedFilters}
                    onSetSelectedFilters={setSelectedFilters}
                    appliedFilters={appliedFilters}
                  />
                )}
              </li>
            );
          })}
        </ul>
        <div
          onClick={filterApply}
          className="block md:hidden mobile-filter-footer p-6 border-t   border-solid border-[rgba(222, 223, 223,0.6)]"
        >
          <button className="w-full bg-headerBar_bgColor bottom-0 outline-0 py-4 px-7 uppercase text-white">
            See results
          </button>
        </div>
        <div className="selected-filters hidden md:flex md:items-center md:gap-3 md:flex-wrap px-4">
          {appliedFilters.map((activeFilter) => {
            return <ActiveFilter activeFilter={activeFilter} />;
          })}
        </div>
      </div>
    </>
  );
}
