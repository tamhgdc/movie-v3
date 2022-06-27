import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
// import { gql } from '@apollo/client';

import store from './context/store/store';
// import { BASE_URL } from './constants/constants';

import './index.css';
import 'remixicon/fonts/remixicon.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import App from './App';

// Set `RestLink` with your endpoint
const restLink = new RestLink({
  uri: 'https://api.themoviedb.org/3'
});

// Setup your client
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
