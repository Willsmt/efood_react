import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${theme.colors.overlay};
  display: flex;
  justify-content: flex-end;
  z-index: 100;
`;

export const Aside = styled.aside`
  position: relative;
  width: 100%;
  max-width: ${theme.layout.sidebarWidth};
  height: 100%;
  background-color: ${theme.colors.coral};
  padding: 32px 8px 8px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
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
  color: ${theme.colors.beige};
  background: none;
  border: none;
  cursor: pointer;
`;

export const EmptyText = styled.p`
  color: ${theme.colors.beige};
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.bold};
  line-height: 22px;
`;

export const ProductList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Product = styled.li`
  position: relative;
  background-color: ${theme.colors.beige};
  padding: 8px;
  display: flex;
  gap: 8px;
  height: 100px;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.h4`
  font-size: ${theme.fonts.sizes.cardTitle};
  font-weight: ${theme.fonts.weights.black};
  color: ${theme.colors.coral};
`;

export const ProductPrice = styled.span`
  margin-top: auto;
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.regular};
  color: ${theme.colors.coral};
`;

export const RemoveButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  color: ${theme.colors.beige};
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.bold};
`;

export const Button = styled.button`
  width: 100%;
  background-color: ${theme.colors.beige};
  color: ${theme.colors.coral};
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.bold};
  padding: 4px 0;
  border: none;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`;

export const Title = styled.h3`
  font-size: ${theme.fonts.sizes.subtitle};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.beige};
  margin-bottom: 16px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  label {
    font-size: ${theme.fonts.sizes.body};
    font-weight: ${theme.fonts.weights.bold};
    color: ${theme.colors.beige};
    margin-bottom: 8px;
  }

  input {
    height: 32px;
    background-color: ${theme.colors.beige};
    border: 1px solid ${theme.colors.beige};
    padding: 0 8px;
    font-family: ${theme.fonts.family};
    font-size: ${theme.fonts.sizes.body};
    font-weight: ${theme.fonts.weights.bold};
    color: ${theme.colors.inputText};
    width: 100%;

    &:focus {
      outline: none;
      border-color: ${theme.colors.coral};
    }

    &.error {
      border-color: #d40000;
    }
  }
`;

export const ErrorText = styled.small`
  display: block;
  margin-top: 4px;
  font-size: ${theme.fonts.sizes.small};
  font-weight: ${theme.fonts.weights.bold};
  color: #ffd0d0;
`;

export const FieldRow = styled.div<{ $template?: string }>`
  display: grid;
  grid-template-columns: ${({ $template }) => $template ?? '1fr 1fr'};
  gap: 24px;
`;

export const SuccessText = styled.p`
  color: ${theme.colors.beige};
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.regular};
  line-height: 22px;
  white-space: pre-wrap;
  margin-bottom: 24px;
`;
