import * as fetch from 'node-fetch'

/**
 * Parsea un objeto a un string en formato query params;
 * @param {Object} query_params Query params obj
 */
const parseQueryParams = (query_params)=>{
  const paramsKey = Object.keys(query_params)
  return paramsKey.map(keys => {
   return  `${keys}=${query_params[keys]}`
  })
}

/**
 * Realizar llamadas ajax mediante fetch
 * @param {String} url Url del endpoint al que se consulta
 * @param {String} method Metodo de la consulta (GET | POST)
 * @param {Object} headers Heders de la consulta
 * @param {Object} body Parametros de la consulta en el body
 * @param {Object} query_params Query params obj
 */
export const fetch_helper = async (url,method,headers,body,query_params) => {
  if(query_params) query_params = parseQueryParams(query_params)
  url = query_params ? `${url}?${query_params.reduce((pre,current)=>`${pre}&${current}`)}` : url;
  let config = {
    method: method || 'GET',
  }
  if(config.method === 'POST') config.body = JSON.stringify(body || {})

  try {
    const response = await fetch(
      url,
      {...config, headers: headers || {}}
    ).then(res => res.json())
    return response
  } catch (error) {
    alert('Error en el metodo helper fetch')
    console.error(error, 'ENDPOINT=>', url)
  }
}

    
