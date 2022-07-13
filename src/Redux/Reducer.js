import axios from "axios"


let initialState = {
    login: "",
    username : ""
}

const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case "CHANGE_LOGIN": return {
            ...state, login: action.payload
        }
        case "UPDATE_USER_NAME": return {
            ...state, username : action.payload
        }
        default:   
        return state;
    }
}

export const FetchData = () => {
    return async dispatch => {
        const data = await axios.get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
            .then(res=>{
                console.log(res)
                return res
            }).catch(err=>{
                alert(err.message)
            })
         dispatch({type: "FETCH_DATA", payload : data})
        }
}

export default Reducer;

