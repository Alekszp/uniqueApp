import React from "react";
import ReactDOM from "react-dom";
import {redux} from "redux";
import reducer from "./Reducer";
import AppView from "./AppView";
import ReduxProvider from "react-redux";

const Provider = ReduxProvider.Provider;

const store = redux.createStore(reducer);

store.dispatch({
    type: "SET_STATE",
    state: {
        phones: ["iPhone 7 Plus", "Samsung Galaxy A5"]
    }
});

const wrapper = document.getElementById("app");
ReactDOM.render(
    <Provider store={store}>
        <AppView />
    </Provider>, wrapper
)