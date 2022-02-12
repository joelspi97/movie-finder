interface MovieState {
    URL: string,
};

const initialState: MovieState = {
    URL: '',
};

function reducer(state = initialState, action: any): MovieState {
    switch(action.type) {
        default:
            return state;
    };
};

export default reducer;
