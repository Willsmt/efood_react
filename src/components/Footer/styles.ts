import styled from 'styled-components';
import { theme, media } from '../../styles/theme';

export const FooterContainer = styled.footer`
  background-color: ${theme.colors.beige};
  padding: 40px 0;
  margin-top: auto;
`;

export const Inner = styled.div`
  max-width: 1366px;
  margin: 0 auto;
  padding: 0 171px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  ${media.tablet} {
    padding: 0 32px;
  }

  ${media.mobile} {
    padding: 0 16px;
  }
`;

export const Logo = styled.div`
  display: flex;

  img {
    display: block;
    height: 32px;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 8px;

  a {
    display: flex;
  }

  img {
    display: block;
    width: 24px;
    height: 24px;
  }
`;

export const Disclaimer = styled.p`
  font-size: ${theme.fonts.sizes.small};
  color: ${theme.colors.coral};
  text-align: center;
  max-width: 480px;
  line-height: 1.6;
`;
