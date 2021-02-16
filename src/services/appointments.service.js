import { fetch_helper } from "./fetch.helper";
import { get_clinicas, get_huecos } from "../enpoints/enpoints.constants";


/**
 * Obtener las clínicas desde el api de lasikcare luego traerlas de la DB local es importante que exista esta DB ws_clinics
 */
export const getClinicas = async ()=>{
  const url = get_clinicas
  const headers = { 
    'Origin' : '*',
  }
  const response = await fetch_helper(url,'GET', headers)
  return response
}

/**
 * Obtener los huecos libres de una ciudad en determinado tiempo
 * @param {Object} query_param 
 * @param {String} query_param.keycli Identificador de la clínica
 * @param {String} query_param.date Fecha actual con formato toLocaleDateString()
 * @param {String} query_param.type Tipo de consulta BI | BIDI
 */
export const getHuecos = async (query_param)=>{

  const url = get_huecos
  const headers = { 
    'Origin' : '*',
  }
  const response = await fetch_helper(url,'GET', headers, null, query_param)
  return response
}
