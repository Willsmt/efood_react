import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background};
`;

export const Cover = styled.div`
  width: 100%;
  height: 280px;
  background-color: ${theme.colors.beige};
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const CoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: stretch;
`;

export const CoverInner = styled.div`
  max-width: 1366px;
  margin: 0 auto;
  padding: 24px 171px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Category = styled.span`
  font-size: 32px;
  font-weight: ${theme.fonts.weights.thin};
  color: ${theme.colors.white};
`;

export const RestaurantName = styled.h2`
  font-size: 32px;
  font-weight: ${theme.fonts.weights.black};
  color: ${theme.colors.white};
`;

export const Main = styled.main`
  max-width: 1366px;
  margin: 0 auto;
  padding: 56px 171px 80px;
  width: 100%;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
`;

export const ProductCard = styled.article`
  background-color: ${theme.colors.coral};
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  img {
    width: 100%;
    height: 167px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
`;

export const ProductName = styled.h3`
  font-size: ${theme.fonts.sizes.subtitle};
  font-weight: ${theme.fonts.weights.black};
  color: ${theme.colors.beige};
`;

export const ProductDescription = styled.p`
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.regular};
  color: ${theme.colors.beige};
  line-height: 22px;
  flex: 1;
`;

export const AddButton = styled.button`
  background-color: ${theme.colors.beige};
  color: ${theme.colors.coral};
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.bold};
  padding: 4px 12px;
  height: 24px;
  border: none;
  cursor: pointer;
  align-self: stretch;
  text-align: center;
`;
