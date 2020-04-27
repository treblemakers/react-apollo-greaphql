import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'


const uri = "http://localhost:9000/graphql"

const httpLink = createHttpLink({ uri, fetch })

const authLink = setContext((_, { headers }) => {
    // รับ token มาจาก localstorage
    const token = JSON.parse(localStorage.getItem('jwt'));
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  export default client;