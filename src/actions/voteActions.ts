import { MovieAction } from "../interfaces/responseAndActions.interface";
import axios from "axios";
import { setLoading, setError } from "./responseActions";
import { BASE_URL, API_KEY } from "../constants";
import { RequestToken } from "../interfaces/responseAndActions.interface";
import { Dispatch } from "react";

export function setToken(payload: String): MovieAction {
  return {
    type: 'SET_TOKEN',
    payload
  };
};

export function eraseToken(): MovieAction {
    return {
      type: 'ERASE_TOKEN'
    };
};
 
export function setSessionId(payload: string): MovieAction {
  return {
    type: 'SET_SESSION_ID',
    payload
  };
};

export function eraseSessionId(): MovieAction {
  return {
    type: 'ERASE_SESSION_ID'
  };
};

let abortController: AbortController;
function checkAxiosController() {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController(); 
}

export function getRequestToken() {
  checkAxiosController();
  
  return (dispatch: Dispatch<any>): void => {
    let url = BASE_URL.concat(`authentication/token/new`);

    axios.get<RequestToken>(url, {
        params: { api_key: API_KEY },
        signal: abortController.signal
    })
      .then(res => {
        // console.log(res.data.request_token);
        dispatch(setToken(res.data.request_token));
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        
        console.error(err);
        dispatch(setError({ value: true, code: err.response.status }));
      })
  };
}

export function createSessionId(approvedToken: string) {
  checkAxiosController();
  
  return (dispatch: Dispatch<any>): void => {
    let url = BASE_URL.concat(`authentication/session/new`);

    axios.post(url, { "request_token": approvedToken }, {
        params: { api_key: API_KEY },
        signal: abortController.signal
    })
      .then(res => {
        console.log(res.data);
        dispatch(setSessionId(res.data.session_id));
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        
        console.error(err);
        dispatch(setError({ value: true, code: err.response.status }));
      })
  };
}

export function rateMovie(sessionId: string, currentMovieId: string, userVote: number) {
  checkAxiosController();
  
  return (dispatch: Dispatch<any>): void => {
    let url = BASE_URL.concat(`movie/${currentMovieId}/rating`);

    axios.post(url, { "value": userVote }, {
        params: { api_key: API_KEY, session_id: sessionId },
        signal: abortController.signal
    })
      .then(res => {
        console.log(res.data);
        console.log('votacion funco');
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        
        console.error(err);
        dispatch(setError({ value: true, code: err.response.status }));
      })
  };
}
