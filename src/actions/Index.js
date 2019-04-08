export const select = (user)=> {
    return {
        type: "USER_SELECTED",
        payload: user
    }
};

export const del = (user)=> {
    return {
        type: "USER_DELETED",
        payload: user
    }
};