export const SET_IS_TIMER_ACTIVE = "SET_IS_TIMER_ACTIVE";

export const setIsTimerActive = (value) => ({
	type: SET_IS_TIMER_ACTIVE,
	isTimerActive: value,
});
