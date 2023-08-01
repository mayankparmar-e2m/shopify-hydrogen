import groq from 'groq';


export const HOME_PAGE_QUERY = groq`
  *[_type == 'home'] | order(_updatedAt desc) [0]
`;
