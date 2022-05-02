export interface MovieResponse {
  loading: boolean;
  error: boolean;
  errorCode: number | null;
}
  
export interface MovieAction {
    type: string;
    payload?: any; 
}
