import {defer} from '@shopify/remix-oxygen';
import { Await, useLoaderData} from '@remix-run/react';
import HomeHeroSlider from '~/components/pages/home/HomeHeroSlider';
import { HERO_SLIDER } from '~/queries/sanity/sections/home/heroSlider';
import { Suspense } from 'react';
import HomeFeaturedCollection from '~/components/pages/home/HomeFeaturedCollection';
import { FEATURED_COLLECTIONS } from '~/queries/sanity/sections/home/featuredCollection';
import { PRODUCT_SNIPET_QUERY } from '~/queries/shopify/productSnipet';

export const meta = () => {
  return [{title: `E2M | Home`}];
};

export async function loader({context}) {
  const {sanity,apollo} = context;
  const heroSection=await sanity.query({
    query:HERO_SLIDER
  }) 
  // feature collection section start
  const {featureColloections:featureColloectionsTitle}=await sanity.query({
      query:FEATURED_COLLECTIONS
    }) 
   
  const featureColloectionsdata= Promise.all(featureColloectionsTitle.data.map(async(item)=>{
    return{ 
      title:item.title,
      data:await  apollo.query( {
          query:PRODUCT_SNIPET_QUERY,
          variables: {
              handle: item.urlData.store.slug.current,
              maxProduct:10
          },
        })
        
    }
  }))
  // feature collection section end
  return defer({heroSection,featureColloectionsdata,featureColloectionsTitle});
}

export default function Homepage() {
  const {heroSection,featureColloectionsdata ,featureColloectionsTitle} = useLoaderData();
  return (
    <div className="home">
      
      {/* home hero slider section start */}
       <HomeHeroSlider heroSlider={heroSection.hero}/>
         {/* home hero slider section end */}

      {/* feature collection section start */}
        <Suspense fallback={<h1>Loading....</h1>}>
        <Await resolve={featureColloectionsdata}>
          {(featureColloectionsdata) =>  {
            const sectionData={
              data:featureColloectionsdata,
              title:featureColloectionsTitle.title
            }
           return  <HomeFeaturedCollection section={sectionData}/>
          }}
        </Await>
        </Suspense> 
        {/* feature collection section end */}
    </div>
  );
}

export  function links() {
  return [
    {rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"},
  ]
}