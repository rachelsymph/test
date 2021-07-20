import React from 'react';

import { StyledText } from './styles';

type HTMLTextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'a';
type TextType = 'medium' | 'regular';

type Props = {
  as?: HTMLTextElement;
  children: React.ReactNode | React.ReactNodeArray;
  textType?: TextType;
};

export default function Text(props: Props) {
  const { as = 'p', children, textType } = props;

  return (
    <StyledText as={as} textType={textType}>
      {children}
    </StyledText>
  );
}
