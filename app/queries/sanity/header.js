import groq from 'groq';
export const SANITY_HEADER_QUERY = groq`
*[_type == "settings"][0]{
    siteLogo,
    headerBar{
      title,
      url->{
        _type,
        store{
        slug{
          current
        }
        }
      }
    }
  }
`;
