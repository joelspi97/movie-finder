import { MovieResponse, MovieAction } from "../interfaces/responseAndActions.interface";

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
            const updatedState = { ...responseState };
            updatedState.error = action.payload.value;
            updatedState.errorCode = action.payload.code
      
            return {
              ...updatedState
            }
        
        default: 
            return responseState;
    }
}
