import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
const httpLink = createHttpLink({uri:`https://e2m-testing-store.myshopify.com/api/2023-07/graphql.json`});
      const middlewareLink = setContext(() => ({
        headers: {
          'X-Shopify-Storefront-Access-Token': "4f406c5a478d2cfb1b9ec4f31a124c24",
        },
      }));
     export const apollo = new ApolloClient({
        link: middlewareLink.concat(httpLink),
        cache: new InMemoryCache(),
      });