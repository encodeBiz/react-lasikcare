export const GET_APPOINTMENT_CONFIG = "GET_APPOINTMENT_CONFIG"; 
export const SET_APPOINTMENT_CONFIG = "SET_APPOINTMENT_CONFIG"; 


export const getAppoinmentConfig = () => ({type: GET_APPOINTMENT_CONFIG})
export const setAppoinmentConfig = (property, data) => ({type: SET_APPOINTMENT_CONFIG, property, data})