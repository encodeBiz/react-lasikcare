export const GET_HOURS_BY_ID = 'get_hours_by_id';
export const GET_HOURS = 'get_hours';

export const getHoursById= (keycli,appointments_type)=>({type:GET_HOURS_BY_ID, clinic_data: {keycli: keycli,  appointments_type: appointments_type}})
export const getHours= ({keycli,appointments_type})=>({type:GET_HOURS, clinic_data: {appointments_type: appointments_type}})