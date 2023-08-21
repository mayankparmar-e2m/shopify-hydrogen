import groq from 'groq';

export const HOME_COLLECTION_LIST_QUERY = groq`
*[_type == 'home'] | order(_updatedAt desc) [0]{
  homeCollectionList[]{
    subtitle,
    title,
    image,
    url->{
      _type,
      store{
        slug
      }
    }
  }
}
`;
