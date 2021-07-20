import styled, { css } from 'styled-components';

type TextProps = {
  textType?: string;
};

export const StyledText = styled.p<TextProps>`
  ${(props) => props.textType === 'regular' && css`
    font-weight: 400;
  `}

  ${(props) => props.textType === 'medium' && css`
    font-weight: 500;
  `}
`;
