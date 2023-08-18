import { useLocation } from '@remix-run/react';
import { useMemo } from 'react';
import { SORT_OPTIONS } from './constants';

export function useVariantUrl(handle, selectedOptions) {
  const { pathname } = useLocation();

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
export const overFlowHidden = (section, add) => {
  const selectedSection = document.querySelector(`${section}`)
  if (selectedSection) {
    if (add) {
      selectedSection.classList.add("overflow-hidden")
    } else {
      selectedSection.classList.remove("overflow-hidden")
    }

  }

}
export const sanityReferenceToUrl = ({ _type, store }) => {
  const handle = store?.slug?.current;
  let childRoute;
  switch (_type) {
    case "collection":
      childRoute = "collections"
      break;
    case "product":
      childRoute = "products"
      break;
    case "home":
      childRoute = "home"
      break;
    default:
      break;
  }
  if (childRoute == "home") {
    return `/`
  } else {
    if (handle && childRoute) {
      return `/${childRoute}/${handle}`
    }
  }
}
// sort url
export function getSortLink(sort, params, location) {
  params.set('sort', sort);
  return `${location.pathname}?${params.toString()}`;
}
// get sort value from params 
export function getSortValuesFromParam(sortParam) {
  const productSort = SORT_OPTIONS.find((option) => option.key === sortParam);

  return (
    productSort || {
      sortKey: null,
      reverse: false,
    }
  );
}

// generate filter url 
export function getFilterLink(filter, rawInput, params, location) {
  console.log(filter, rawInput, params, location,'dwdwdwfwfwf')
  const paramsClone = new URLSearchParams(params);
  const newParams = filterInputToParams(filter.type, rawInput, paramsClone);
  return `${location.pathname}?${newParams.toString()}`;
}
// filter input to params
function filterInputToParams(type, rawInput, params) {
  console.log(params,'paramsparams')
  const input = typeof rawInput === 'string' ? JSON.parse(rawInput) : rawInput;
  switch (type) {
    case 'PRICE_RANGE':
      if (input.price.min) params.set('minPrice', input.price.min);
      if (input.price.max) params.set('maxPrice', input.price.max);
      break;
    case 'LIST':
      Object.entries(input).forEach(([key, value]) => {
        if (typeof value === 'string') {
          const multipleFilterType=["tag",'productVendor',"productType"];
           
          const allFilterParams = params.getAll(key)
          console.log(key, value, params.values(),'allFilterParamsallFilterParams')
          // select multiple filter option
          if(multipleFilterType.includes(key)){
            if(!allFilterParams.includes(value)){
              params.append(key, value);
            }
          }else{
              params.set(key, value);
          }
          
        } else if (typeof value === 'boolean') {
          params.set(key, value.toString());
        }
        else {  
          const {name, value: val} = value;
          const allVariants = params.getAll(`variantOption`);
          const newVariant = `${name}:${val}`;
          console.log(allVariants,'allVariantsallVariants')
          if (!allVariants.includes(newVariant)) {
            params.append('variantOption', newVariant);
          }
        }
      });
      break;
  }

  return params;
}
// remove applied filter from url params

export function getRemoveedAppliedFilterParamsUrl(filter, params, location) {
  const paramsClone = new URLSearchParams(params);
  const multipleFilterType=["tag",'productVendor',"productType",'variantOption'];
  if  (multipleFilterType.includes(filter.urlParam.key)) {
    const getAllSelectedFilterParamKey = paramsClone.getAll(filter.urlParam.key);
    const filteredSelectedFilterParamKeys= getAllSelectedFilterParamKey.filter(
      (options) => !options.includes(filter.urlParam.value),
    );
    paramsClone.delete(filter.urlParam.key);
    for (const filteredSelectedFilterParamKey of filteredSelectedFilterParamKeys) {
      paramsClone.append(filter.urlParam.key, filteredSelectedFilterParamKey);
    }
  } else {
    paramsClone.delete(filter.urlParam.key);
  }
  return `${location.pathname}?${paramsClone.toString()}`;
}