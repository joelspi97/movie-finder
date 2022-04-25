// Adaptar las interfaces al nuevo funcionamiento
interface MovieState {
  URL: string,
};

const initialState: MovieState = {
  URL: '',
};

function moviesReducer(state = initialState, action: any): MovieState {
  switch (action.type) {
    default:
      return state;
  };
};

export default moviesReducer;
