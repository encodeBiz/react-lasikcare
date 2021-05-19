import { SET_IS_LOADING } from "./loading.actions";

const defaultLoading = false;

const fn = (state = { loading: defaultLoading }, action) => {
	switch (action.type) {
		case SET_IS_LOADING:
			const { value } = action.value;
			return {
				loading: value,
			};

		default:
			return state;
	}
};


export default fn;