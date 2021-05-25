import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import GlobalStyle from "./components/GlobalStyles";

ReactDOM.render(
  <>
    <GlobalStyle />
    <Routes />
  </>,
  document.getElementById("root")
);
