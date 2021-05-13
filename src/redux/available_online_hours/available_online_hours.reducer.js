import { SET_ONLINE_HOURS } from "./available_online_hours.actions";

const initialState = {};

const fn = (state = { initialState }, action) => {
  switch (action.type) {
    case SET_ONLINE_HOURS:
      const { appointment_type, onlineHoursData, month } = action;
      const data = onlineHoursData[appointment_type].hueco;
      return {
        ...state,
        onlineData: {
          status: "finish",
          data: {
            ...state.onlineData,
            [appointment_type]: { [month]: data },
          },
        },
      };

    default:
      return state;
  }
};


export default fn; 