import { SET_IS_LOADING, SET_IS_ONLINE_LOADING } from "./loading.actions";

const initialState = {
	globalLoading: false,
	onlineGlobalLoading: false,
};

const fn = (state = initialState, action) => {
	switch (action.type) {
		case SET_IS_LOADING:
			return { ...state, globalLoading: action.loading.value };
		case SET_IS_ONLINE_LOADING:
			return { ...state, onlineGlobalLoading: action.onlineLoading.onlineValue };
		default:
			return state;
	}
};

export default fn;
