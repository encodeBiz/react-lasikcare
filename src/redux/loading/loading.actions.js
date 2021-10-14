export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_IS_ONLINE_LOADING = "SET_IS_ONLINE_LOADING"; 

export const setIsGlobalLoading = (value) => ({ type: SET_IS_LOADING, loading: { value } });

export const setOnlineGlobalLoading = (onlineValue) => ({ type: SET_IS_ONLINE_LOADING, onlineLoading: { onlineValue } });
