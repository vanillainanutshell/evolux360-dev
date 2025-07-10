/**
 * Função de debounce para otimizar performance
 * @param {Function} func - Função a ser executada
 * @param {number} delay - Delay em millisegundos
 * @returns {Function} Função com debounce aplicado
 */
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}