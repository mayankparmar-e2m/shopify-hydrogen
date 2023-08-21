import groq from 'groq';

export const HOME_WHO_WE_ARE = groq`
*[_type == 'home'] | order(_updatedAt desc) [0]{
 homeWhoWeAre{
   title,
   ctaLabel,
   ctaUrl->{
     _type,store{
       slug
     }
   },
   data
 }
 }
`;
