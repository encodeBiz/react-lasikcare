import { SET_IS_TIMER_ACTIVE } from "./timer.actions";

const initialState = {
	isTimerActive: false,
};

const fn = (state = initialState, action) => {
	switch (action.type) {
		case SET_IS_TIMER_ACTIVE:
			return {
				...state,
				isTimerActive: action.isTimerActive,
			};
		default:
			return state;
	}
};

export default fn;
