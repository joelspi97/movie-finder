interface MovieAction {
  type: string,
  payload?: any,
};

function fetchMovies(): MovieAction {
  return {
    type: 'FETCH',
  };
};

export { fetchMovies };
