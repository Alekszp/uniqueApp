import ActionTypes from "./ActionTypes";
import PhoneDispatcher from "./PhonesDispatcher";

const Actions = {
    addItem(text) {
        PhoneDispatcher.dispatch({
            type: ActionTypes.ADD_ITEM,
            text
        });
    },
    removeItem(text) {
        PhoneDispatcher.dispatch({
            type: ActionTypes.REMOVE_ITEM,
            text
        });
    }
};

export default Actions;