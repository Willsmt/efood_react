import * as S from './styles';

const Footer = () => {
  return (
    <S.FooterContainer>
      <S.Inner>
        <S.Logo>efood</S.Logo>
        <S.SocialLinks>
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2c2.7 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.42.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.77c-.55.55-1.11.89-1.77 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.42.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.7 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.55-.55 1.11-.89 1.77-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.25a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5zM17.5 6.75a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M22 5.8c-.7.32-1.5.53-2.3.63a4 4 0 001.76-2.2c-.78.46-1.64.8-2.56.98a4 4 0 00-6.82 3.65 11.3 11.3 0 01-8.2-4.16 4 4 0 001.24 5.34c-.65-.02-1.26-.2-1.8-.5v.05a4 4 0 003.2 3.92c-.6.16-1.23.18-1.84.07a4 4 0 003.73 2.78A8 8 0 012 18.3a11.3 11.3 0 006.1 1.79c7.33 0 11.34-6.07 11.34-11.33v-.52A8 8 0 0022 5.8z" />
            </svg>
          </a>
        </S.SocialLinks>
        <S.Disclaimer>
          A efood é uma plataforma para divulgação de estabelecimentos, a
          responsabilidade pela entrega, qualidade dos produtos é toda do
          estabelecimento contratado.
        </S.Disclaimer>
      </S.Inner>
    </S.FooterContainer>
  );
};

export default Footer;
