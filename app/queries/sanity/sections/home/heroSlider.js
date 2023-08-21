import groq from 'groq';

export const HERO_SLIDER = groq`
  *[_type == 'home'] | order(_updatedAt desc) [0]{
hero[]{
     subtitle,
     title,
     desk_image,
     mob_image,
     links{
      title,
       reference->{
         _type,
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
`;
