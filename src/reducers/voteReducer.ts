import { MovieAction } from "../interfaces/responseAndActions.interface";

interface VoteState {
    token: null | string;
};

const voteInitialState: VoteState = {
    token: null
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
        
        default: 
            return voteState;
    }
}
