let initialState = {
    loading : false,
    data : null,
    error : ""
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "FETCH_DATA_REQUEST":
            return {
                ...state, loading : true
            }
        case "FETCH_DATA_SUCCESS":
            return {
                loading : false, data : action.payload, error : ""
            }
        case "FETCH_DATA_FAILURE":
            return {
                 loading : false, data : "", error : action.payload
            };
        case "ADD_PRODUCT":
            return {
                 ...state, data : action.payload
            };
        case "ADD_CATEGORY":
            return {
                 ...state, data : action.payload
            };
        case "DELETE_PRODUCT":
            return {
                 ...state, data : action.payload
            };
        case "DELETE_MULTIPLE_PRODUCT":
            return {
                    ...state, data : action.payload
            };
        default :
        return state;
    }
}

export default reducer;