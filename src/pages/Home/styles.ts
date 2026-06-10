import styled from 'styled-components';
import { theme, media } from '../../styles/theme';
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
  padding: 40px 171px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.tablet} {
    padding: 40px 32px;
  }

  ${media.mobile} {
    height: auto;
    padding: 32px 16px;
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
  padding: 80px 171px;
  width: 100%;

  ${media.tablet} {
    padding: 56px 32px;
  }

  ${media.mobile} {
    padding: 40px 16px;
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
