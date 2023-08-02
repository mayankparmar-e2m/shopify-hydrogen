import gql from "graphql-tag";
/* eslint no-use-before-define: 0 */
export const MENUS_ITEMS = gql`
  fragment MenuItem on MenuItem {
    id
    title
    type
    url
  }
`;
export const HEADER_QUERY = gql`
   ${MENUS_ITEMS}
   query layoutMenus(
    $country: CountryCode
    $language: LanguageCode
    $headerMenuHandle: String!
  )@inContext(language: $language, country: $country) {
    shop {
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
    items{
    ...MenuItem
    items{
      ...MenuItem
    }
    }
  }
}
`;
