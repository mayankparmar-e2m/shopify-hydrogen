import {useLocation} from '@remix-run/react';
import {useMemo} from 'react';

export function useVariantUrl(handle, selectedOptions) {
  const {pathname} = useLocation();

  return useMemo(() => {
    return getVariantUrl({
      handle,
      pathname,
      searchParams: new URLSearchParams(),
      selectedOptions,
    });
  }, [handle, selectedOptions, pathname]);
}

export function getVariantUrl({
  handle,
  pathname,
  searchParams,
  selectedOptions,
}) {
  const match = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(pathname);
  const isLocalePathname = match && match.length > 0;

  const path = isLocalePathname
    ? `${match[0]}products/${handle}`
    : `/products/${handle}`;

  selectedOptions.forEach((option) => {
    searchParams.set(option.name, option.value);
  });

  const searchString = searchParams.toString();

  return path + (searchString ? '?' + searchParams.toString() : '');
}
// add overflow-hidden global class in selected section ex. section = body,.className,#IdName;add=true/false 
export const overFlowHidden=(section,add)=>{
  const selectedSection=document.querySelector(`${section}`)
  if(selectedSection){
    if(add){
      selectedSection.classList.add("overflow-hidden")
    }else{
      selectedSection.classList.remove("overflow-hidden")
    }
   
  }

}
export const sanityReferenceToUrl=({_type,store})=>{
   const handle=store?.slug?.current;
   let childRoute; 
      switch (_type) {
        case "collection":
          childRoute="collections"
          break;
          case "product":
            childRoute="products"
            break;
        default:
          break;
      }
      if(handle && childRoute){
        return `/${childRoute}/${handle}`
      }
}