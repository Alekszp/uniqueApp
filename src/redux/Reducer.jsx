import { Map, List } from "immutable";
import _ from "lodash";

const reducer = function (state = Map(), action) {
    switch (action.type) {
        case "SET_STATE":
            return state.merge(action.state);
        case "ADD_PHONE":
            return state.update("phones", (phones = List()) => phones.push(action.phone));
        case "DELETE_PHONE":
            // return state.update('phones', (phones) => _.remove(phones, (i) => {return i !== action.phone}));
            let coll = state;
            console.log(coll);
            let collUPD = state.update('phones', (phones) => phones = [1, 2, 3]);
            console.log(collUPD);
            let collFiltered = state.update('phones', (phones) => _.remove(phones, (i) => {return i !== action.phone}));
            console.log(collFiltered);
            console.log(state);
            return collFiltered;
    }
    return state;
};

export default reducer;