
import groq from 'groq';
export const SANITY_FOOTER_QUERY = groq`
*[_type == "settings"][0]{
    socialMedia,
    footerIcons[]{
      altText,
      image
    }
  }
`;

