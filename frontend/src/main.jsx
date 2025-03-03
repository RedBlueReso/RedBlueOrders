import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {ApolloClient , InMemoryCache , ApolloProvider} from '@apollo/client'

const client = new ApolloClient({
  uri : "https://redblueorders.onrender.com/graphql",
  // uri : "http://localhost:4000/graphql",
  credentials : "include",
  cache : new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>  

      <App />
    </ApolloProvider>
  </StrictMode>
)
