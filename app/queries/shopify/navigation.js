import gql from 'graphql-tag';
export const MENUS_ITEMS = gql`
  fragment MenuItem on MenuItem {
    id
    title
    type
    url
  }
`;
export const NAVIGATION_QUERY = gql`
  ${MENUS_ITEMS}
  query layoutMenus(
    $country: CountryCode
    $language: LanguageCode
    $headerMenuHandle: String!
  ) @inContext(language: $language, country: $country) {
    shop {
      name
      primaryDomain {
        url
      }
    }
    menu(handle: $headerMenuHandle) {
      id
      handle
      itemsCount
      title
      __typename
      items {
        ...MenuItem
        items {
          ...MenuItem
        }
      }
    }
  }
`;
