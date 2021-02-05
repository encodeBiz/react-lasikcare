export const NAVIGATE = 'navigate';
export const NAVIGATE_BACK = 'navigate_back';

/**
 * Navegación
 * @param {Object} state 
 * @param {string} state.pre_url
 * @param {string} state.url
 */
export function navigate(state) {
  return {
    type: NAVIGATE,
    state
  }
}

/**
 * Back action
 * @param {Object} history history
 */
export function navigateBack(history) {
  return {
    type: NAVIGATE,
    history
  }
}