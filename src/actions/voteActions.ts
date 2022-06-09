import { MovieAction } from "../interfaces/responseAndActions.interface";
import axios from "axios";
import { setError } from "./responseActions";
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

export function setHasVoted(payload: boolean): MovieAction {
  return {
    type: 'SET_HAS_VOTED',
    payload
  };
};

let abortController: AbortController;
function updateAxiosController() {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController(); 
}

export function getRequestToken() {
  updateAxiosController();
  
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
        dispatch(eraseToken());
        
        if (err.response) {
          dispatch(setError({ value: true, code: err.response.status }));
        } else {
          dispatch(setError({ value: true, code: undefined }));
        }
      })
  };
}

export function createSessionId(approvedToken: string) {
  updateAxiosController();
  
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
        if (err.response.status === 401) return;
        
        console.error(err);

        if (err.response) {
          dispatch(setError({ value: true, code: err.response.status }));
        } else {
          dispatch(setError({ value: true, code: undefined }));
        }
      })
  };
}

export function rateMovie(sessionId: string, currentMovieId: string, userVote: number) {
  updateAxiosController();
  
  return (dispatch: Dispatch<any>): void => {
    let url = BASE_URL.concat(`movie/${currentMovieId}/rating`);

    axios.post(url, { "value": userVote }, {
        params: { api_key: API_KEY, session_id: sessionId },
        signal: abortController.signal
    })
      .then(res => {
        console.log(res.data);
        dispatch(setHasVoted(true));
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        
        console.error(err);
        dispatch(setHasVoted(false));
        dispatch(eraseSessionId());
        
        if (err.response) {
          dispatch(setError({ value: true, code: err.response.status }));
        } else {
          dispatch(setError({ value: true, code: undefined }));
        }
      })
  };
}
