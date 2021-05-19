import moment from "moment";
import {
  getHuecos,
  getHuecosOnline,
} from "../../services/appointments.service";
import {
  videoConferenceTestDataJune,
  videoConferenceTestDataMay,
} from "../../test-data/testData";

export const GET_ONLINE_HOURS = "GET_ONLINE_HOURS";
export const SET_ONLINE_HOURS = "SET_ONLINE_HOURS";
export const UPDATE_ONLINE_HOURS = "UPDATE_ONLINE_HOURS";

export const setOnlineHours = ({ appointment_type, data, month }) => ({
  type: SET_ONLINE_HOURS,
  appointment_type,
  onlineHoursData: data,
  month,
});

export const updateOnlineHours = (appointment_type, data, nextMonth) => ({
  type: UPDATE_ONLINE_HOURS,
  appointment_type,
  onlineHoursData: data,
  nextMonth,
});

export const fetchOnlineAvailableHours = (type, date) => {
  return async (dispatch) => {
    try {
      let dateToSend = "";
      if (date) {
        dateToSend = date;
      } else {
        dateToSend = moment().format("DD/MM/YYYY");
      }

      /// Make api call

      //   const res = await getHuecosOnline({date: dateToSend, type: type})

      ///////////////////////////////////////////
      //    TEST -start
      ///////////////////////////////////////////

      const res = videoConferenceTestDataMay[type];

      ///////////////////////////////////////////
      //    TEST-end
      ///////////////////////////////////////////

      const month = moment(dateToSend, "DD/MM/YYYY").format("M");
      const data = res.huecos ? { onlineHours: res.huecos } : {};

      return dispatch(setOnlineHours({ appointment_type: type, data, month }));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateOnlineAvailableHours = (type, date, nextMonth) => {
  return async (dispatch) => {
    try {
      //   const res = await getHuecosOnline({date, type})

      const res = videoConferenceTestDataJune;
      console.log("Res");
      console.log(res);
      const data = res.huecos ? { onlineHours: res.huecos } : {};
      console.log(data);

      return dispatch(updateOnlineHours(type, data, nextMonth));
    } catch (error) {
      console.error(error);
    }

    // try {
    //   const res = await getHuecos({date, type})
    //   const data = res.huecos ? {type: res.huecos} : {}
    //   return dispatch()
    // } catch (error) {

    // }
  };
};
