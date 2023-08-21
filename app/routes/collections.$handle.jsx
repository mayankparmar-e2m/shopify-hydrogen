import {defer, json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData, Link, Await} from '@remix-run/react';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import ProductSnipet from '~/components/global/ProductSnipet';
import SortBy from '~/components/pages/collection/SortBy';
import {getSortValuesFromParam, overFlowHidden} from '~/utils/utils';
import FilterOptions from '~/components/pages/collection/FilterOptions';
import {Suspense, useState} from 'react';
import gql from 'graphql-tag';
import {COLLECTION_HERO_IMAGE} from '~/queries/sanity/sections/collection/heroSection';
import HeroImage from '~/components/global/HeroImage';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data.collection.title} Collection`}];
};

export async function loader({request, params, context}) {
  const {handle} = params;
  const {apollo, sanity} = context;
  const searchParams = new URL(request.url).searchParams;
  const {sortKey, reverse} = getSortValuesFromParam(searchParams.get('sort'));
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });
  if (!handle) {
    return redirect('/collections');
  }
  const filters = []; // filter array value for graphql api input
  const appliedFilters = []; // applied fiters

  const knownFilters = [
    'productVendor',
    'productType',
    'productMetafield',
    'tag',
  ]; // filter options productMetafield,variantMetafield,tag
  const available = 'available'; //  filter for only availabe products
  const variantOption = 'variantOption'; // for variant option filter ex. color size

  for (const [key, value] of searchParams.entries()) {
    if (available === key) {
      filters.push({available: value === 'true'});
      appliedFilters.push({
        label: value === 'true' ? 'In stock' : 'Out of stock',
        urlParam: {
          key: available,
          value,
        },
      });
    } else if (knownFilters.includes(key)) {
      filters.push({[key]: value});
      appliedFilters.push({label: value, urlParam: {key, value}});
    } else if (key.includes(variantOption)) {
      const [name, val] = value.split(':');
      filters.push({variantOption: {name, value: val}});
      appliedFilters.push({label: val, urlParam: {key, value}});
    }
  }

  // Builds min and max price filter since we can't stack them separately into
  // the filters array. See price filters limitations:
  // https://shopify.dev/custom-storefronts/products-collections/filter-products#limitations
  if (searchParams.has('minPrice') || searchParams.has('maxPrice')) {
    const price = {};
    if (searchParams.has('minPrice')) {
      price.min = Number(searchParams.get('minPrice')) || 0;
      appliedFilters.push({
        label: `Min: $${price.min}`,
        urlParam: {key: 'minPrice', value: searchParams.get('minPrice')},
      });
    }
    if (searchParams.has('maxPrice')) {
      price.max = Number(searchParams.get('maxPrice')) || 0;
      appliedFilters.push({
        label: `Max: $${price.max}`,
        urlParam: {key: 'maxPrice', value: searchParams.get('maxPrice')},
      });
    }
    filters.push({
      price,
    });
  }
  const data = apollo.query({
    query: COLLECTION_QUERY,
    variables: {handle, ...paginationVariables, sortKey, reverse, filters},
  });
  const collectionHeroSection = await sanity.query({
    query: COLLECTION_HERO_IMAGE,
    params: {
      handle: handle,
    },
  });
  return defer({
    collection: data,
    appliedFilters,
    collectionHeroSection: collectionHeroSection?.hero,
  });
}

export default function Collection() {
  const {collection, appliedFilters, collectionHeroSection} = useLoaderData();
  const [filterPopup, setFilterPopup] = useState(false);

  const showMobileFilter = () => {
    overFlowHidden('body', true);
    setFilterPopup(true);
  };
  const closeMobilefilter = () => {
    overFlowHidden('body', false);
    setFilterPopup(false);
  };
  return (
    <div className="collection">
      {/* <h1>{collection.title}</h1>
      <p className="collection-description">{collection.description}</p> */}
      <HeroImage
        img_mob={collectionHeroSection?.img_mob?.asset?._ref}
        title={collectionHeroSection?.title}
        img_desk={collectionHeroSection?.img_desk?.asset?._ref}
      />
      <Suspense fallback={<h1>Loading....</h1>}>
        <Await resolve={collection}>
          {({data}) => {
            const collection = data.collection;
            const {products} = collection;
            return (
              <>
                <div className="collection-filter-wrapper  py-4 md:py-8  border-b border-solid border-primary mb-12">
                  <div className="container  mx-auto  px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center md:w-[78%]">
                        <p
                          onClick={showMobileFilter}
                          className="text-primary text-xs font-normal uppercase tracking-wider  mr-7"
                        >
                          Filters
                        </p>
                        <div className="fiter-options">
                          <FilterOptions
                            onClosePopup={closeMobilefilter}
                            showMobileFilterPopup={filterPopup}
                            filters={products.filters}
                            appliedFilters={appliedFilters}
                          />
                        </div>
                      </div>
                      <SortBy initialSortOrder="MANUAL" />
                    </div>
                  </div>
                </div>
                <div className="container mx-auto  px-6">
                  <Pagination connection={collection.products}>
                    {({nodes, isLoading, PreviousLink, NextLink}) => (
                      <>
                        <PreviousLink className="text-center block">
                          {isLoading ? (
                            'Loading...'
                          ) : (
                            <span>↑ Load previous</span>
                          )}
                        </PreviousLink>
                        <div className="products-grid block md:flex md:items-center md:flex-wrap    md:gap-4">
                          {nodes.map((product, index) => {
                            return (
                              <div className="w-full md:w-[calc(33.33%-16px)] md:flex-shrink-0  mb-10 md:mb-14">
                                <ProductSnipet
                                  key={product.id}
                                  product={product}
                                  loading={index < 8 ? 'eager' : undefined}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <br />
                        <NextLink className="text-center block">
                          {isLoading ? 'Loading...' : <span>Load more ↓</span>}
                        </NextLink>
                      </>
                    )}
                  </Pagination>
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = gql`
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first
        last: $last
        before: $startCursor
        after: $endCursor
        sortKey: $sortKey
        reverse: $reverse
        filters: $filters
      ) {
        filters {
          id
          label
          type
          values {
            label
            input
            id
            count
          }
        }
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
