import React from 'react';

import { StyledText } from './styles';

type HTMLTextElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'a'
  | 'subtitle1'
  | 'subtitle2'
  | 'body'
  | 'buttonMedium'
  | 'buttonRegular'
  | 'overline'
  | 'caption1'
  | 'caption2'
  | 'caption3'
  | 'caption4'
  | 'caption5';

type TextType = 'medium' | 'regular' | 'bold';

type Props = {
  as?: HTMLTextElement;
  children: React.ReactNode | React.ReactNodeArray;
  textType?: TextType;
  color?: string;
};

export default function Text(props: Props) {
  const { as = 'p', children, textType, color } = props;

  return (
    <StyledText as={as} textType={textType} color={color}>
      {children}
    </StyledText>
  );
}
