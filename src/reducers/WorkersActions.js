import initUser from "./Workers.jsx";
const initialUser = initUser();

export default function(state=initialUser[0], action){
    switch(action.type){
        case "USER_SELECTED":
        console.log(state);        
        return action.payload;
        break;
        default: return state;

    }
}