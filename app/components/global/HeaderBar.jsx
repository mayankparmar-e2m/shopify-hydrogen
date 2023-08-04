import { Link } from "@remix-run/react";
import { sanityReferenceToUrl } from "~/utils/utils";

export default function HeaderBar({title,url}) {
  const redirectUrl=sanityReferenceToUrl(url)
  return (
    <Link to={redirectUrl || "/" } className=" block header-bar bg-headerBar_bgColor text-center py-3 max-md:py-2">
       <p  className="text-white text-xs font-normal">{title}</p>
    </Link>
  )
}
