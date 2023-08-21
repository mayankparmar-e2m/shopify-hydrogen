import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';
import {CollectionsGrid} from '~/components/pages/collection/CollectionsGrid';
import {COLLECTIONS_QUERY} from '~/queries/shopify/collection';

export async function loader({context, request}) {
  const {apollo} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });
  const {data} = await apollo.query({
    query: COLLECTIONS_QUERY,
    variables: {
      ...paginationVariables,
    },
  });
  return json(data);
}
export default function Collections() {
  const {collections} = useLoaderData();
  return (
    <div className="collections px-6 md:px-0">
      <div className="title-wrapper my-7 md:my-20">
        <h1 className="text-center text-primary text-2xl md:text-3xl font-normal uppercase leading-9 tracking-widest">
          Our Collections
        </h1>
        <div className="text max-w-md w-full mx-auto mt-4 md:mt-8">
          <p className="text-center text-accent text-base font-normal leading-relaxed tracking-tigh">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
        </div>
      </div>
      <div className="container mx-auto">
        <Pagination connection={collections}>
          {({nodes, isLoading, PreviousLink, NextLink}) => (
            <div>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              <CollectionsGrid collections={nodes} />
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more ↓</span>}
              </NextLink>
            </div>
          )}
        </Pagination>
      </div>
    </div>
  );
}
