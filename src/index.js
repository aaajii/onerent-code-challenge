import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// Importing Apollo libraries
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

// Setting URL variable
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

// Initializing Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
