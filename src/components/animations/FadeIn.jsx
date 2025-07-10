import React from 'react';
import { Box } from '@mui/material';
import { useInView } from '../../utils/scrollUtils';

/**
 * Componente que aplica animação de fade-in quando o elemento entra na viewport
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Conteúdo a ser animado
 * @param {string} props.direction - Direção da animação (up, down, left, right)
 * @param {number} props.delay - Atraso em segundos antes da animação começar
 * @param {number} props.duration - Duração da animação em segundos
 * @param {Object} props.sx - Estilos adicionais para o componente Box
 */
export default function FadeIn({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  sx = {},
  ...props 
}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Definir transformação inicial baseada na direção
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(40px)';
      case 'down':
        return 'translateY(-40px)';
      case 'left':
        return 'translateX(40px)';
      case 'right':
        return 'translateX(-40px)';
      default:
        return 'translateY(40px)';
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : getInitialTransform(),
        transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
        transitionDelay: `${delay}s`,
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
}