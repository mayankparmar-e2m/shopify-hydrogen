import gql from 'graphql-tag';
/* eslint no-use-before-define: 0 */
export const ARTICLES = gql`
  query Articles($first: Int) {
    articles(first: $first) {
      nodes {
        title
        blog {
          handle
        }
        image {
          width
          url
          id
          height
          altText
        }
        handle
        excerptHtml
        id
        excerpt
        contentHtml
        content
      }
    }
  }
`;
