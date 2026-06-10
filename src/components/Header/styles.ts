import styled from 'styled-components';
import { theme, media } from '../../styles/theme';
import vector from '../../assets/image/Vector.png';

export const HeaderContainer = styled.header`
  background-color: ${theme.colors.beige};
  background-image: url(${vector});
  background-repeat: repeat;
  padding: 24px 0;
`;

export const Inner = styled.div`
  max-width: 1366px;
  margin: 0 auto;
  padding: 0 171px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  ${media.tablet} {
    padding: 0 32px;
  }

  ${media.mobile} {
    padding: 0 16px;
  }
`;

export const NavLink = styled.a`
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.coral};
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    display: block;
    height: 32px;
  }
`;

export const CartButton = styled.button`
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.coral};
  background: none;
  border: none;
  cursor: pointer;
`;
