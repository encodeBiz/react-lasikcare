import { send_error_email } from "../enpoints/enpoints.constants";
import { fetch_helper } from "./fetch.helper";

/**
 *
 * @param {Object} query_params
 * @param {String} query_params.clinic_id
 * @param {String} query_params.clinic_name
 * @param {String} query_params.clinic_address
 * @param {String} query_params.date
 * @param {String} query_params.hour
 * @param {String} query_params.endhour
 * @param {String} query_params.keymed
 * @param {String} query_params.gender
 * @param {String} query_params.first_name
 * @param {String} query_params.last_name
 * @param {String} query_params.email
 * @param {String} query_params.phone
 * @param {String} query_params.message
 * @param {String} query_params.utmsource
 * @param {String} query_params.tmr
 * @param {String} query_params.error
 *
 *
 */

export const sendErrorEmail = async (query_params) => {
	try {
		const url = send_error_email;
		const headers = {
			Origin: "*",
		};

		const response = await fetch_helper(url, "GET", headers, null, query_params);
		console.log(response);
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
