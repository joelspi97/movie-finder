import { MovieAction } from "../interfaces/response.interface";

export function setLoading(payload: boolean): MovieAction {
    return {
        type: 'SET_LOADING',
        payload
    };
}

export function setError(payload: { value: boolean, code?: string }): MovieAction {
    return {
        type: 'SET_ERROR',
        payload
    };
}