import { useLocation } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { DownIcon } from "~/components/global/Icons"
import FilterValues from "./FilterValues"
import ActiveFilter from "./ActiveFilter"

export default function FilterOptions({ filters = [], appliedFilters = [] }) {
    const wrapperRef = useRef(null)
    const { search } = useLocation()
    const [showSelectedFilterOption, setShowSelectedFilterOption] = useState(null)
    useEffect(() => {
        function handleDocumentClick(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                // wrapper outer click
                setShowSelectedFilterOption(null)
            }
        }
        document.addEventListener("click", handleDocumentClick)
        return () => document.removeEventListener("click", handleDocumentClick)
    }, [wrapperRef])
    useEffect(() => {
        if (showSelectedFilterOption) {
            setShowSelectedFilterOption(null)
        }
    }, [search])
    return (
        <div className="filter-option-wrapper flex items-center justify-between w-full flex-wrap gap-3" ref={wrapperRef}>
            <ul className="flex items-center gap-5 ">
                {
                    filters.map((filter) => {
                        return <li className="filter-option  mb-0 cursor-pointer relative" key={filter.id} onClick={() => setShowSelectedFilterOption(filter.id)}>
                            <div className="flex items-center gap-2">
                                <span className="text-accent text-xs font-normal leading-relaxed tracking-tight"> {filter.label}</span><span className={` w-2  ${showSelectedFilterOption === filter.id ? 'transition-transform rotate-180' : 'transition-transform rotate-0'}`}><DownIcon /></span>
                            </div>
                            {
                                showSelectedFilterOption === filter.id && <FilterValues appliedFilters={appliedFilters} filter={filter} filterValues={filter.values} />
                            }
                        </li>
                    })
                }
            </ul>
            <div className="selected-filters  flex items-center gap-3 flex-wrap px-4">
                {
                    appliedFilters.map((activeFilter) => {
                        return <ActiveFilter activeFilter={activeFilter} />
                    })
                }
            </div>
        </div>
    )
}
