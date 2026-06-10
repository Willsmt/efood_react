import { useEffect, useState } from 'react';
import * as S from './styles';

// Botão flutuante "voltar ao topo". Aparece após rolar a página e é
// exibido apenas em tablet/celular (escondido no desktop via CSS).
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <S.Button
      type="button"
      $visible={visible}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
    >
      ↑
    </S.Button>
  );
};

export default ScrollToTop;
