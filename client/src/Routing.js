import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./App.scss";

import { createStore } from "redux";
import reducer from "./store/reducers/index";
import { Provider } from "react-redux";

import Landing from "./components/Landing/Landing";
import Validator from "./lib/Validator/Validator";
import App from "./App";
import ModalProvider from "./lib/Modal/ModalProvider";

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function Router() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Validator>
            <ModalProvider>
              <Route exact path="/" component={Landing} />
              <Route path="/client/" component={App} />
            </ModalProvider>
          </Validator>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
