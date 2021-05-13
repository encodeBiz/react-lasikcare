import moment from "moment";
import { getHuecosOnline } from "../../services/appointments.service";
import { videoConferenceTestData2 } from "../../test-data/testData";

export const GET_ONLINE_HOURS = "GET_ONLINE_HOURS";
export const SET_ONLINE_HOURS = "SET_ONLINE_HOURS";

export const setOnlineHours = ({ appointment_type, data, month }) => ({
  type: SET_ONLINE_HOURS,
  appointment_type,
  onlineHoursData: data,
  month,
});

export const fetchOnlineAvailableHours = (type, date) => {
  return async (dispatch) => {
    try {
      let dateToSend = "";
      if (date) {
        dateToSend = date;
      } else {
        dateToSend = moment().add(1, "month").format("DD/MM/YYYY");
      }

      /// Make api call

      //   const res = await getHuecosOnline({date: dateToSend, type: type})

      ///////////////////////////////////////////
      //    TEST -start
      ///////////////////////////////////////////

      const res = videoConferenceTestData2;

      ///////////////////////////////////////////
      //    TEST-end
      ///////////////////////////////////////////

      const month = moment(dateToSend, "DD/MM/YYYY").format("M");
      const data = res.huecos ? { [type]: res.huecos } : {};

      return dispatch(setOnlineHours({ type, data, month }));
    } catch (error) {
      console.error(error);
    }
  };
};
