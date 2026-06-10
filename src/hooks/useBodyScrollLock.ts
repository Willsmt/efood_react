import { useEffect } from 'react';

// Trava a rolagem do body enquanto `active` for true (overlays abertos).
export const useBodyScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
};
