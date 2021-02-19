export const NAVIGATE = 'navigate';
export const NAVIGATE_BACK = 'navigate_back';

/**
 * Navegación
 * @param {Object} state 
 * @param {string} state.pre_url
 * @param {string} state.url
 */
export const navigate = (state) =>   ({ type: NAVIGATE, state })


/**
 * Back action
 * @param {Object} history history
 */
export const navigateBack = (history) => ({ type: NAVIGATE, history })