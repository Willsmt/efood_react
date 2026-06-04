import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Card = styled.article`
  border: 1px solid ${theme.colors.coral};
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
`;

export const ImageWrapper = styled.div`
  position: relative;
  height: 217px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Tags = styled.div`
  position: absolute;
  top: 16px;
  right: 8px;
  display: flex;
  gap: 8px;
`;

export const Tag = styled.span`
  background-color: ${theme.colors.coral};
  color: ${theme.colors.beige};
  font-size: ${theme.fonts.sizes.xsmall};
  font-weight: ${theme.fonts.weights.bold};
  padding: 6px 10px;
`;

export const Info = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.h3`
  font-size: ${theme.fonts.sizes.subtitle};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.coral};
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${theme.fonts.sizes.subtitle};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.coral};
`;

export const Star = styled.span`
  font-size: ${theme.fonts.sizes.subtitle};
`;

export const Description = styled.p`
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.regular};
  color: ${theme.colors.coral};
  line-height: 22px;
  flex: 1;
`;

export const Button = styled.button`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  background-color: ${theme.colors.coral};
  color: ${theme.colors.beige};
  font-size: ${theme.fonts.sizes.body};
  font-weight: ${theme.fonts.weights.bold};
  padding: 4px 12px;
  height: 24px;
  border: none;
  cursor: pointer;
  text-decoration: none;
`;
