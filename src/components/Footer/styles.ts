import styled from 'styled-components';
import { theme } from '../../styles/theme';

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
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: ${theme.fonts.weights.black};
  color: ${theme.colors.coral};
  border: 1px solid ${theme.colors.coral};
  padding: 4px 8px;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 8px;

  a {
    color: ${theme.colors.coral};
    display: flex;
  }
`;

export const Disclaimer = styled.p`
  font-size: ${theme.fonts.sizes.small};
  color: ${theme.colors.coral};
  text-align: center;
  max-width: 480px;
  line-height: 1.6;
`;
