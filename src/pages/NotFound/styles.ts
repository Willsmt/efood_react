import styled from 'styled-components';
import { theme, containerPadding } from '../../styles/theme';

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background};
`;

export const Main = styled.main`
  flex: 1;
  max-width: 1366px;
  width: 100%;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 80px;
  ${containerPadding}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: ${theme.fonts.sizes.title};
  font-weight: ${theme.fonts.weights.black};
  color: ${theme.colors.coral};
`;

export const Text = styled.p`
  font-size: ${theme.fonts.sizes.subtitle};
  color: ${theme.colors.coral};
`;

export const HomeLink = styled.a`
  margin-top: 16px;
  background-color: ${theme.colors.coral};
  color: ${theme.colors.beige};
  font-weight: ${theme.fonts.weights.bold};
  padding: 8px 16px;
  text-decoration: none;
`;
