import axios from "axios"

export const fetchDataRequest = () =>{
    return {
        type : 'FETCH_DATA_REQUEST'
    }
}

export const fetchDataSuccess = (data) =>{
    return {
        type : 'FETCH_DATA_SUCCESS',
        payload : data
    }
}

export const fetchDataFailure = (error) =>{
    return {
        type : 'FETCH_DATA_FAILURE',
        payload : error
    }
}


export const fetchData = () => {
    return (dispatch)=>{
        dispatch(fetchDataRequest);
        axios.get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
        .then(res=>{
            const dataRec = res.data
            dispatch(fetchDataSuccess(dataRec))
        })
        .catch(err => {
            const errorMsg = err.message
            dispatch(fetchDataFailure(errorMsg))
        })
    }
}