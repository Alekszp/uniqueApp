const addPhone = function(phone){
    return {
        type: "ADD_PHONE",
        phone
    }
}
const deletePhone = function(phone){
    return {
        type: "DELETE_PHONE",
        phone
    }
}

export {addPhone, deletePhone};