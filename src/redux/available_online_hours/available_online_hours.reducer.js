import {
  SET_ONLINE_HOURS,
  UPDATE_ONLINE_HOURS,
} from "./available_online_hours.actions";

const initialState = {};

const fn = (state = initialState, action) => {
  switch (action.type) {
    case SET_ONLINE_HOURS:
      return {
        ...state,
        [action.month] : action.onlineHoursData,
      };

    case UPDATE_ONLINE_HOURS:
      const currentData = state.data[action.appointment_type];
      const newData = action.onlineHoursData.onlineHours[action.appointment_type].hueco;

      return {
        ...state,
        [action.appointment_type]:
          newData && newData.length > 0
            ? { ...currentData, [action.nextMonth]: [...newData] }
            : currentData,
      };
    default:
      return state;
  }
};

export default fn;
