import SanityLink from "../SanityLinks";
export default function HeaderBar({title,url}) {
  return (
    <SanityLink data={url} className=" block header-bar bg-headerBar_bgColor text-center py-3 max-md:py-2">
       <p  className="text-white text-xs font-normal">{title}</p>
    </SanityLink>
  )
}
