export const NAVIGATE = 'navigate';

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