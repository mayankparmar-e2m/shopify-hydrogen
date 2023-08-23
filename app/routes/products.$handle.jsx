import { Suspense, useEffect, useState } from 'react';
import { defer, redirect } from '@shopify/remix-oxygen';
import { Await, Link, useLoaderData, useNavigate } from '@remix-run/react';
import { PRODUCT_SNIPET_QUERY } from '~/queries/shopify/productSnipet';
import { PRODUCT_PAGE_QUERY } from '~/queries/shopify/product';
import { Image, flattenConnection, parseGid, useMoney } from '@shopify/hydrogen';
import { handleize, removeDuplicatesObjFromArray } from '~/utils/utils';
import ProductDetail from '~/components/pages/product/ProductDetail';
export const meta = ({ data, matches }) => {
  const title = matches[0]?.data?.header?.data?.shop?.name
  return [{ title: ` ${data.product.title} | ${title}` }];
};
export async function loader({ params, request, context }) {
  const { handle } = params;
  const { apollo } = context;
  const searchParams = new URL(request.url).searchParams;
  const variantIdFromParams = searchParams.get("variant")
  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }
  const { data } = await apollo.query({
    query: PRODUCT_PAGE_QUERY,
    variables: { handle },
  })
  const variants = flattenConnection(data.product.variants);
  // first availabe product vatriant for sale or first variant
  const firstAvailabeVariant = variants.find((variant) => variant.availableForSale) || variants[0];
  // selected variant from search params
  const selectedVariant = variants.find((variant) => {
    if (parseGid(variant.id)?.id === variantIdFromParams) {
      return variant
    }
  })
  // selected or first availabe variants
  const selectedOrFirstAvailabeVariant = selectedVariant || firstAvailabeVariant
  return defer({ product: data.product, selectedVariant: selectedOrFirstAvailabeVariant })
}
function Product() {
  const { product, selectedVariant } = useLoaderData();
  return <div className='product py-11'>
    <div className='container  mx-auto'>
      <div className='product-wrapper flex gap-5 justify-between'>
        <div className='product-slider w-[calc(50%-20px)]'>
          <div className='image'>
            <Image data={product.featuredImage} />
          </div>
        </div>
        <ProductDetail product={product} selectedVariant={selectedVariant} />
      </div>
    </div>
  </div>
}
export default Product