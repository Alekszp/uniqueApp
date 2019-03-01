import {combineReducers} from "redux";
import CustomersReducer from "./Customer.jsx";
import WorkersReducer from "./Workers.jsx";
import SelectedUser from "./WorkersActions.js";

const allReducers = combineReducers({
    customers: CustomersReducer,
    workers: WorkersReducer,
    selected: SelectedUser
});

export default allReducers;