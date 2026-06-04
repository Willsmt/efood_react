import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const HeaderContainer = styled.header`
  background-color: ${theme.colors.beige};
  padding: 24px 0;
`;

export const Inner = styled.div`
  max-width: 1366px;
  margin: 0 auto;
  padding: 0 171px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavLink = styled.a`
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.coral};
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: ${theme.fonts.weights.black};
  color: ${theme.colors.coral};
  border: 1px solid ${theme.colors.coral};
  padding: 4px 8px;
`;

export const CartButton = styled.button`
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.coral};
  background: none;
  border: none;
  cursor: pointer;
`;
