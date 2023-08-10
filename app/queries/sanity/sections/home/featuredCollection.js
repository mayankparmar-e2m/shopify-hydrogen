import groq from "groq";
export const FEATURED_COLLECTIONS =groq`
*[_type == 'home'] | order(_updatedAt desc) [0]{
   featureColloections{
    title,
   "data":featureCollections[]{
     title,
     "urlData":reference->{
      "type": _type,
       store
          {
          slug
          {
          current
          }
          }
     }
   }
 }
 }
`