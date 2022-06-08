import { MovieAction } from "../interfaces/responseAndActions.interface";

interface VoteState {
    token: null | string;
    sessionId: null | string;
};

const voteInitialState: VoteState = {
    token: null,
    sessionId: null
}

export default function voteReducer(voteState = voteInitialState, action: MovieAction) {
    switch(action.type) {
        case 'SET_TOKEN':
            return {
                ...voteState,
                token: action.payload
            };
        
        case 'ERASE_TOKEN':
            return {
                ...voteState,
                token: null
            };

        case 'SET_SESSION_ID':
            return {
                ...voteState,
                sessionId: action.payload
            };

        case 'ERASE_SESSION_ID':
            return {
                ...voteState,
                sessionId: null
            };
        
        default: 
            return voteState;
    }
}
