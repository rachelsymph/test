import styled, { css } from 'styled-components';

type TextProps = {
  textType?: string;
  color?: string;
};

export const StyledText = styled.p<TextProps>`
  color: ${(props) => props.color} !important;

  ${(props) =>
    props.textType === 'regular' &&
    css`
      font-weight: 400;
    `}

  ${(props) =>
    props.textType === 'medium' &&
    css`
      font-weight: 500;
    `}
`;
