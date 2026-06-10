import logo from '../../assets/image/logo.png';
import instagram from '../../assets/image/Insta.png';
import facebook from '../../assets/image/facebook.png';
import twitter from '../../assets/image/twitter.png';
import * as S from './styles';

const Footer = () => {
  return (
    <S.FooterContainer>
      <S.Inner>
        <S.Logo>
          <img src={logo} alt="efood" />
        </S.Logo>
        <S.SocialLinks>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <img src={instagram} alt="Instagram" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <img src={facebook} alt="Facebook" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <img src={twitter} alt="Twitter" />
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
