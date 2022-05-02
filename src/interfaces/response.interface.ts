export interface MovieResponse {
  loading: boolean;
  error: boolean;
  errorCode: string | null;
}
  
export interface MovieAction {
    type: string;
    payload?: any; 
}
