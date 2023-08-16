import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import HomeHeroSlider from '~/components/pages/home/HomeHeroSlider';
import {HERO_SLIDER} from '~/queries/sanity/sections/home/heroSlider';
import {Suspense} from 'react';
import HomeFeaturedCollection from '~/components/pages/home/HomeFeaturedCollection';
import {FEATURED_COLLECTIONS} from '~/queries/sanity/sections/home/featuredCollection';
import {PRODUCT_SNIPET_QUERY} from '~/queries/shopify/productSnipet';
import {HOME_COLLECTION_LIST_QUERY} from '~/queries/sanity/sections/home/homeCollectionList';
import HomeCollectionList from '~/components/pages/home/HomeCollectionList';
import {HOME_WHO_WE_ARE} from '~/queries/sanity/sections/home/whoWeAre';
import WhoWeAre from '~/components/pages/home/WhoWeAre';
import {IMAGE_WITH_TEXT} from '~/queries/sanity/global/ImageWithText';
import ImageWithText from '~/components/global/ImageWithText';
import {HOME_BLOG_SECTION} from '~/queries/sanity/sections/home/homeBlog';
import {ARTICLES} from '~/queries/shopify/articles';
import HomeBlogSection from '~/components/pages/home/HomeBlogSection';

export const meta = () => {
  return [{title: `E2M | Home`}];
};

export async function loader({context}) {
  const {sanity, apollo} = context;
  const heroSection = await sanity.query({
    query: HERO_SLIDER,
  });
  // feature collection section start
  const {featureCollections: featureCollectionsTitle} = await sanity.query({
    query: FEATURED_COLLECTIONS,
  });
  const featureColloectionsdata =
    featureCollectionsTitle?.data &&
    Promise.all(
      featureCollectionsTitle?.data?.map(async (item) => {
        return {
          title: item.title,
          data: await apollo.query({
            query: PRODUCT_SNIPET_QUERY,
            variables: {
              handle: item.urlData.store.slug.current,
              maxProduct: 10,
            },
          }),
        };
      }),
    );
  // feature collection section end
  // HOME COLLECTION LIST SECTION START
  const homeCollectionList = sanity.query({
    query: HOME_COLLECTION_LIST_QUERY,
  });
  // HOME COLLECTION LIST SECTION END

  // home Who We Are Section start
  const whoWeAreSection = sanity.query({
    query: HOME_WHO_WE_ARE,
  });
  // home Who We Are Section end

  // home image with text start
  const homeImageWithText = sanity.query({
    query: IMAGE_WITH_TEXT,
  });
  // home image with text end

  // HOME BLOG SECTION START
  const homeBlogSectionData = Promise.all([
    sanity.query({
      query: HOME_BLOG_SECTION,
    }),
    apollo.query({
      query: ARTICLES,
      variables: {
        first: 4,
      },
    }),
  ]);

  //  HOME BLOG SECTION END
  return defer({
    heroSection,
    featureColloectionsdata,
    featureCollectionsTitle,
    homeCollectionList,
    whoWeAreSection,
    homeImageWithText,
    homeBlogSectionData,
  });
}

export default function Homepage() {
  const {
    heroSection,
    featureColloectionsdata,
    featureCollectionsTitle,
    homeCollectionList,
    whoWeAreSection,
    homeImageWithText,
    homeBlogSectionData,
  } = useLoaderData();
  return (
    <div className="home">
      {/* home hero slider section start */}
      {heroSection?.hero && <HomeHeroSlider heroSlider={heroSection.hero} />}

      {/* home hero slider section end */}

      {/* feature collection section start */}
      <Suspense fallback={<h1>Loading....</h1>}>
        <Await resolve={featureColloectionsdata}>
          {(featureColloectionsdata) => {
            const sectionData = {
              data: featureColloectionsdata,
              title: featureCollectionsTitle?.title,
            };
            return (
              featureCollectionsTitle && (
                <HomeFeaturedCollection section={sectionData} />
              )
            );
          }}
        </Await>
      </Suspense>
      {/* feature collection section end */}

      {/* home collection list start */}
      <Suspense fallback={<h1>Loadinng....</h1>}>
        <Await resolve={homeCollectionList}>
          {({homeCollectionList}) => {
            return (
              homeCollectionList?.length > 0 && (
                <HomeCollectionList section={homeCollectionList} />
              )
            );
          }}
        </Await>
      </Suspense>
      {/* home collection list end */}

      {/* home who we are start */}
      <Suspense fallback={<h1>Loadinng....</h1>}>
        <Await resolve={whoWeAreSection}>
          {({homeWhoWeAre}) => {
            return homeWhoWeAre && <WhoWeAre section={homeWhoWeAre} />;
          }}
        </Await>
      </Suspense>
      {/* home who we are end */}

      {/* home image with text start */}
      <Suspense fallback={<h1>Loading....</h1>}>
        <Await resolve={homeImageWithText}>
          {({homeImageWithText}) => {
            return <ImageWithText section={homeImageWithText} />;
          }}
        </Await>
      </Suspense>
      {/* home image with text end */}

      {/* home blog section start */}
      <Suspense fallback={<h1>Loading....</h1>}>
        <Await resolve={homeBlogSectionData}>
          {(homeBlogSectionData) => {
            return <HomeBlogSection section={homeBlogSectionData} />;
          }}
        </Await>
      </Suspense>
      {/* home blog section  end */}
    </div>
  );
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css',
    },
  ];
}
