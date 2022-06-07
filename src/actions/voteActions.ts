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

export function eraseToken(payload: String): MovieAction {
    return {
      type: 'ERASE_TOKEN'
    };
};
  

let abortController: AbortController;
export function getRequestToken() {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();
  
  return (dispatch: Dispatch<any>): void => {
    let url = BASE_URL.concat(`/authentication/token/new`);

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
