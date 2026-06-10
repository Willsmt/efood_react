import styled from 'styled-components';
import { theme, media, containerPadding } from '../../styles/theme';
import vector from '../../assets/image/Vector.png';

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background};
`;

export const Hero = styled.section`
  background-color: ${theme.colors.beige};
  background-image: url(${vector});
  background-repeat: repeat;
  height: 384px;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${containerPadding}

  ${media.mobile} {
    height: auto;
    padding-top: 32px;
    padding-bottom: 32px;
    gap: 32px;
  }
`;

export const Logo = styled.div`
  display: flex;

  img {
    display: block;
    height: 57px;
  }
`;

export const HeroText = styled.h1`
  margin: auto 0;
  font-size: ${theme.fonts.sizes.title};
  font-weight: ${theme.fonts.weights.black};
  color: ${theme.colors.coral};
  text-align: center;
  line-height: 1.2;

  ${media.mobile} {
    margin: 0;
    font-size: 24px;
  }
`;

export const Main = styled.main`
  max-width: 1366px;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 80px;
  width: 100%;
  ${containerPadding}

  ${media.tablet} {
    padding-top: 56px;
    padding-bottom: 56px;
  }

  ${media.mobile} {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

export const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 32px;

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const Message = styled.p`
  font-size: ${theme.fonts.sizes.cardTitle};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.coral};
  text-align: center;
`;
