import groq from 'groq';

export const COLLECTION_HERO_IMAGE = groq`
*[_type == 'collection' && store.slug.current == $handle][0]{
  hero
}
`;
