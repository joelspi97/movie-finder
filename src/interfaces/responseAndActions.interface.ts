export interface MovieResponse {
  loading: boolean;
  error: boolean;
  errorCode: number | null;
}
  
export interface MovieAction {
    type: string;
    payload?: any; 
}

export interface RequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}
