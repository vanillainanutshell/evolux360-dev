import React from 'react';

/**
 * Função para realizar scroll suave até um elemento
 * @param {string} elementId - ID do elemento para onde fazer o scroll
 * @param {number} offset - Offset em pixels (para compensar headers fixos)
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Hook para detectar quando um elemento entra na viewport
 * @param {Object} options - Opções do IntersectionObserver
 * @returns {Object} ref - Referência para anexar ao elemento
 * @returns {boolean} inView - Se o elemento está visível
 */
export const useInView = (options = {}) => {
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef();
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);
    
    const currentElement = ref.current;
    
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, options]);
  
  return { ref, inView };
};