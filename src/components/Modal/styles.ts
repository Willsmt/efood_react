import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
`;

export const Content = styled.div`
  position: relative;
  background-color: ${theme.colors.coral};
  width: 100%;
  max-width: 1024px;
  padding: 32px;
  display: flex;
  gap: 24px;
`;

export const Close = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
  color: ${theme.colors.white};
  background: none;
  border: none;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.white};
`;

export const Title = styled.h3`
  font-size: ${theme.fonts.sizes.cardTitle};
  font-weight: ${theme.fonts.weights.black};
  margin-bottom: 16px;
`;

export const Description = styled.p`
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.regular};
  line-height: 22px;
  white-space: pre-wrap;
  margin-bottom: 16px;
`;

export const AddButton = styled.button`
  align-self: flex-start;
  margin-top: auto;
  background-color: ${theme.colors.beige};
  color: ${theme.colors.coral};
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.bold};
  padding: 4px 8px;
  border: none;
  cursor: pointer;
`;
