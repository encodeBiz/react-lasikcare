import { fetch_helper } from "./fetch.helper";
import {
  get_clinicas,
  get_huecos,
  set_huecos,
} from "../enpoints/enpoints.constants";

/**
 * Obtener las clínicas desde el api de lasikcare luego traerlas de la DB local es importante que exista esta DB ws_clinics
 */
export const getClinicas = async () => {
  const url = get_clinicas;
  const headers = {
    Origin: "*",
  };
  const response = await fetch_helper(url, "GET", headers);
  return response;
};

/**
 * Obtener los huecos libres de una ciudad en determinado tiempo
 * @param {Object} query_param
 * @param {String} query_param.keycli Identificador de la clínica
 * @param {String} query_param.date Fecha actual con formato toLocaleDateString()
 * @param {String} query_param.type Tipo de consulta BI | BIDI
 */
export const getHuecos = async (query_param) => {
  const url = get_huecos;
  const headers = {
    Origin: "*",
  };
  const response = await fetch_helper(url, "GET", headers, null, query_param);
  return response;
};

/**
 *
 * @param {Object} params
 * @param {String} params.clinic_id
 * @param {String} params.clinic_name
 * @param {String} params.clinic_address
 * @param {String} params.date
 * @param {String} params.hour
 * @param {String} params.horaFin
 * @param {String} params.keymed
 * @param {String} params.gender
 * @param {String} params.first_name
 * @param {String} params.last_name
 * @param {String} params.email
 * @param {String} params.phone
 * @param {String} params.message
 * @param {String} params.utm_source Procedencia del usuario. Se setea en el componente Navbar
 * @param {String} params.tmr
 * @param {String} params.comentarios
 * @param {String} params.sexo
 *
 */

export const setHuecos = async (query_params) => {
  try {
    const url = set_huecos;
    const headers = {
      Origin: "*",
    };
    const response = await fetch_helper(
      url,
      "GET",
      headers,
      null,
      query_params
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {Object} query_param
 * @param {String} query_param.date  Fecha actual con formato toLocaleDateString()
 * @param {String} query_param.type Tipo de consulta BI | BIDI
 */

export const getHuecosOnline = async (query_param) => {
  const url = "get_online_huecos";
  const headers = {
    Origin: "*",
  };

  const response = await fetch_helper(url, "GET", headers, query_param);
};
