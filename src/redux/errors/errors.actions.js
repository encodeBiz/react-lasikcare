export const SET_ERROR = "SET_ERROR";
export const GET_ERROR = "GET_ERROR";
export const DELETE_ERROR = "DELETE_ERROR";

export const setGlobalError = (error) => ({ type: SET_ERROR, error });
export const getError = () => ({ type: GET_ERROR });
export const deleteError = (error) => ({ type: GET_ERROR, error });
