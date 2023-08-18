import {
  useLocation,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import { useState, useRef, useEffect } from 'react';
import { DownIcon } from '~/components/global/Icons';
import { SORT_OPTIONS } from '~/utils/constants';
import { getSortLink } from '~/utils/utils';

export default function SortBy() {
  const wrapperRef = useRef(null);
  const navigate = useNavigate()

  const [showSortOption, setShowSortOption] = useState(false);
  const [params] = useSearchParams();
  const location = useLocation();
  const activeItem = SORT_OPTIONS.find((item) => item.key === params.get('sort')) || SORT_OPTIONS[0]
  const selectSortBy = () => {
    setShowSortOption(!showSortOption)
  }
  useEffect(() => {
    if (showSortOption) {
      setShowSortOption(false)
    }
  }, [activeItem.label])
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSortOption(false)
        // console.warn("outside click")
      } else {
        //console.warn("inside click")
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef]);
  return (
    <div className="collection-sortby-wrapper relative md:w-[22%]" ref={wrapperRef}>
      <div
        className="flex items-center gap-3 md:gap-7 cursor-pointer"
        onClick={selectSortBy}
      >
        <div className="title">
          <span className="text-primary text-xs font-normal uppercase tracking-wider">
            Sort By
          </span>
        </div>
        <div className="selected-sort flex items-center gap-1 md:gap-3">
          <span className="text-accent text-xs font-normal leading-relaxed tracking-wider">
            {activeItem.label}
          </span>
          <span
            className={`${showSortOption && 'transition-transform rotate-180'}`}
          >
            <DownIcon />
          </span>
        </div>
      </div>

      <div
        className={`sort-option-wrapper absolute left-7 mt-3 rounded-lg p-3 border border-solid border-primary bg-white ${showSortOption ? 'block' : 'hidden'
          }`}
      >
        <ul>
          {SORT_OPTIONS.map((item) => {
            return (
              <li
                key={item.key}
                className="text-accent text-xs font-normal cursor-pointer leading-relaxed tracking-tight"
              >
                <div
                  onClick={() => navigate(getSortLink(item.key, params, location))}
                  preventScrollReset
                  className="text-accent text-xs font-normal leading-relaxed tracking-tight"
                >
                  <span className="mr-8">{item.label}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
