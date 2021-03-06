import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import GlobalStyle from "./components/GlobalStyles";

//redux
import { Provider } from "react-redux";
import createStore from "./store";
import { PersistGate } from "redux-persist/es/integration/react";

const { store, persistor } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
