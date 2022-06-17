import { MovieAction } from "../interfaces/responseAndActions.interface";

interface VoteState {
    token: null | string;
    sessionId: null | string;
    hasVoted: boolean;
};

const voteInitialState: VoteState = {
    token: null,
    sessionId: null,
    hasVoted: false
}

export function voteReducer(voteState = voteInitialState, action: MovieAction) {
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

        case 'SET_HAS_VOTED':
            return {
                ...voteState,
                hasVoted: action.payload
            };
        
        default: 
            return voteState;
    }
}
