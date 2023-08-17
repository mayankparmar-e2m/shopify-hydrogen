import { useLocation, useNavigate, useSearchParams } from "@remix-run/react";
import { getFilterLink } from "~/utils/utils";

export default function FilterValues({ filterValues = [], filter, appliedFilters }) {
    const [params] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate()
    return <div className="filter-values absolute rounded-lg p-3 border border-solid border-primary bg-white z-50 min-w-max">
        <ul className="filter-value_wrapper">
            {
                filterValues.map((filterValue) => {
                    const activeFilter = appliedFilters.findIndex((item) => item.label === filterValue.label) >= 0 == true
                    const to = getFilterLink(filter, filterValue.input, params, location);
                    return <li key={to} onClick={() => navigate(to)} className=" flex items-center mb-1 gap-2 justify-between">
                        <span className={`text-accent text-xs  leading-relaxed tracking-tight ${activeFilter ? "font-bold" : "font-normal"}`}>{filterValue.label}</span>
                        <span className={`text-accent text-xs  leading-relaxed tracking-tight ${activeFilter ? "font-bold" : "font-normal"}`}>({filterValue.count})</span></li>
                })
            }
        </ul>
    </div>
}