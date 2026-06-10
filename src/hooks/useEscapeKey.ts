import { useEffect } from 'react';

// Chama `onEscape` quando a tecla Esc é pressionada (enquanto `active`).
export const useEscapeKey = (onEscape: () => void, active = true) => {
  useEffect(() => {
    if (!active) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onEscape, active]);
};
