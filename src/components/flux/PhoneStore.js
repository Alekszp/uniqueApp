import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
// import Actions from "./Actions";
import ActionTypes from "./ActionTypes";
import PhonesDispatcher from "./PhonesDispatcher";

class PhonesStore extends ReduceStore {
    constructor() {
        super(PhonesDispatcher);
    }
    getInitialState() {
        return Immutable.List.of("iPhone 7", "Google Pixel");
    }
    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.ADD_ITEM:
                if (action.text) {
                    return state.push(action.text);
                }
                return state;
            case ActionTypes.REMOVE_ITEM:
                let index = state.indexOf(action.text)
                if (index > -1) {
                    return state.delete(index);
                }
                return state;
            default:
                return state;
        }

    }
}

export default new PhonesStore();