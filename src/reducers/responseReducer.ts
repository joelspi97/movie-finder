import { MovieResponse, MovieAction } from "../interfaces/response.interface";

const responseInitialState: MovieResponse = {
    loading: false,
    error: false,
    errorCode: null
}

export default function responseReducer(responseState = responseInitialState, action: MovieAction) {
    switch(action.type) {
        case 'SET_LOADING':
            return {
                ...responseState,
                loading: action.payload
            }

        case 'SET_ERROR':
            return {
                ...responseState,
                error: action.payload.value,
                errorCode: action.payload.code 
            }
        
        default: 
            return responseState;
    }
}
