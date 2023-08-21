import groq from 'groq';

export const HOME_BLOG_SECTION = groq`
  *[_type == 'home'] | order(_updatedAt desc) [0]{
    blogSection
  }
`;
