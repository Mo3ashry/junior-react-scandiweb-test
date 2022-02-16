import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createStore } from "redux";
import reducers from "./store/reducers";
import { Provider } from "react-redux";
import Global from "./styledComponents/Global";
import middleware from "./store/middleware";

const store = createStore(reducers, middleware);
const defaultOptions = {
  // prevent apollo from caching because of wrong data overriding due to backend id duplicate bug
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};
export const apolloClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  defaultOptions,
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <Global />
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
