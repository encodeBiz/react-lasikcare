export const GET_HOURS_BY_ID = 'get_hours_by_id';
export const GET_HOURS = 'get_hours';

export const getHoursById= (cityId)=>({type:GET_HOURS_BY_ID, clinic_data: {}})
export const getHoursById= ({keycli,appointments_type})=>({type:GET_HOURS_BY_ID, clinic_data: {keycli: }})