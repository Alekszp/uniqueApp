import React, {Component} from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./Reducer.jsx";
import AppView from "./AppView.jsx";
import { Provider } from "react-redux";

const store = createStore(reducer);

store.dispatch({
    type: "SET_STATE",
     state: {
        phones: ["iPhone 7 Plus", "Samsung Galaxy A5", "Google hooyougle"]
    }
});

// class Frr extends Component {
//     render() {
//         return <h1>qqq</h1>
//     }
// }

const wrapper = document.getElementById("app");
ReactDOM.render(
    <Provider store={store}>
        <AppView />
    </Provider>, wrapper
)