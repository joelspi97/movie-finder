export type MovieResponse = {
  loading: boolean;
  error: boolean;
  errorCode: string | null;
}

export type DetailsState = {
    getDetails?: any;
    title: string;
    vote_average: number;
    overview: string;
    poster_path: string;
};
  
export type MovieAction = {
    type: string;
    payload?: any; 
}
