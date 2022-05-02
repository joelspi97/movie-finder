export function setLoading(payload: boolean) {
    return {
        type: 'SET_LOADING',
        payload
    };
}

export function setError(payload: { value: boolean, code?: string }) {
    return {
        type: 'SET_ERROR',
        payload
    };
}
