import { useLocation, useNavigate, useSearchParams } from "@remix-run/react";
import { useCallback, useMemo } from "react";
import { getFilterLink } from "~/utils/utils";

export default function FilterValues({ mobileFilterUrl,filterValues = [], filter, appliedFilters ,onGenerateMobileFilterUrl}) {
    const [params] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate()
    return <div className="filter-values md:absolute rounded-lg px-6 md:p-3 md:border border-solid border-primary bg-white z-10 min-w-max">
        <ul className="filter-value_wrapper">
            {
                filterValues.map((filterValue) => {
                    const activeFilter = appliedFilters.findIndex((item) => item.label === filterValue.label) >= 0 == true
                    const to = getFilterLink(filter, filterValue.input, params, location);
                    return <li key={to} 
                    onClick={() =>filterValue.count > 0 && navigate(to)} 
                    className={`${filterValue.count <= 0 && "opacity-50"} flex items-center mb-1 gap-2 justify-between`}>
                        <span className={`text-accent text-xs  leading-relaxed tracking-tight ${activeFilter ? "font-bold" : "font-normal"}`}>{filterValue.label}</span>
                        <span className={`text-accent text-xs  leading-relaxed tracking-tight ${activeFilter ? "font-bold" : "font-normal"}`}>({filterValue.count})</span></li>
                })
            }
        </ul>
    </div>
}