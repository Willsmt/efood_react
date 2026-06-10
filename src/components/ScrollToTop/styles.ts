import styled from 'styled-components';
import { theme, media } from '../../styles/theme';

export const Button = styled.button<{ $visible: boolean }>`
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 90;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  /* Escondido no desktop — só faz sentido em tablet/celular. */
  display: none;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.coral};
  color: ${theme.colors.beige};
  font-size: 24px;
  line-height: 1;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease, visibility 0.2s ease;

  ${media.tablet} {
    display: flex;
  }
`;
