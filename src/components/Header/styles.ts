import styled from 'styled-components';
import { theme, media, containerPadding } from '../../styles/theme';
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  ${containerPadding}
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
  white-space: nowrap;
`;

// Texto completo (desktop/tablet); some no celular para não espremer o header.
export const CartLabelFull = styled.span`
  ${media.mobile} {
    display: none;
  }
`;

// Versão curta (🛒 + contagem); só aparece no celular.
export const CartLabelShort = styled.span`
  display: none;

  ${media.mobile} {
    display: inline;
  }
`;
