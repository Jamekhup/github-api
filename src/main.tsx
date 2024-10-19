import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider,  HttpLink } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

const token = import.meta.env.VITE_GITHUB_TOKEN;

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");

if(rootElement){
  createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
      
  )
}


