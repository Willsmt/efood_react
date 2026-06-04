import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background};
`;

export const Hero = styled.section`
  background-color: ${theme.colors.beige};
  height: 384px;
  padding: 40px 171px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: ${theme.fonts.weights.black};
  color: ${theme.colors.coral};
  border: 1px solid ${theme.colors.coral};
  padding: 4px 8px;
`;

export const HeroText = styled.h1`
  margin: auto 0;
  font-size: ${theme.fonts.sizes.title};
  font-weight: ${theme.fonts.weights.black};
  color: ${theme.colors.coral};
  text-align: center;
  line-height: 1.2;
`;

export const Main = styled.main`
  max-width: 1366px;
  margin: 0 auto;
  padding: 80px 171px;
  width: 100%;
`;

export const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 32px;
`;

export const Message = styled.p`
  font-size: ${theme.fonts.sizes.cardTitle};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.coral};
  text-align: center;
`;
