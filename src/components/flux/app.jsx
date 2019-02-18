import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./AppContainer";

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<AppContainer />, wrapper) : false;
