import { useEffect } from 'react';
import type { RefObject } from 'react';

// Seletor dos elementos que podem receber foco pelo teclado.
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

// Prende o foco do teclado dentro do `ref` enquanto `active` for true.
// Ao abrir: foca o primeiro elemento. Ao dar Tab no último, volta ao
// primeiro (e vice-versa com Shift+Tab). Ao fechar: devolve o foco ao
// elemento que estava focado antes (acessibilidade dos overlays).
export const useFocusTrap = <T extends HTMLElement>(
  ref: RefObject<T>,
  active = true,
) => {
  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.offsetParent !== null); // só os visíveis

    const focusables = getFocusable();
    (focusables[0] ?? container).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [ref, active]);
};
