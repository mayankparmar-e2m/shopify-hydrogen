import { Link, useLocation, useSearchParams } from "@remix-run/react";
import { getRemoveedAppliedFilterParamsUrl } from "~/utils/utils";

export default function ActiveFilter({ activeFilter }) {
    const [params] = useSearchParams();
    const location = useLocation();
    const url = getRemoveedAppliedFilterParamsUrl(activeFilter, params, location)
    return (
        <Link to={url} className="px-2.5 py-0.5 bg-secondary justify-center items-center gap-3.5 inline-flex" >
            <p class="text-white text-xs font-medium uppercase tracking-wide">{activeFilter.label}</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={9}
                height={9}
                fill="none"
            >
                <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M4.5 5.302 1.11 8.806a.647.647 0 0 1-.925 0 .73.73 0 0 1 0-.971L3.45 4.532.246 1.165a.73.73 0 0 1 0-.97.647.647 0 0 1 .925 0L4.5 3.691 7.83.194a.647.647 0 0 1 .924 0 .73.73 0 0 1 0 .971L5.549 4.532l3.266 3.303a.73.73 0 0 1 0 .97.647.647 0 0 1-.924 0L4.5 5.303Z"
                    clipRule="evenodd"
                />
            </svg>
        </Link>
    )
}
