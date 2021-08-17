import React from 'react';

import { Text } from 'src/client/components';

import {
  StyledHeader,
  StyledHeaderAction,
  StyledSubHeader,
  StyledTitleHeader,
} from './styles';

type HTMLTextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'a';

type Props = {
  title: string;
  subtitle?: string;
  as?: HTMLTextElement;
  extra?: React.ReactNode;
};

export default function Header(props: Props) {
  const { title, subtitle, as = 'h4', extra } = props;

  return (
    <StyledHeader>
      <StyledTitleHeader>
        <Text as={as} textType="medium">
          {title}
        </Text>
        <StyledSubHeader>
          <Text>{subtitle}</Text>
        </StyledSubHeader>
      </StyledTitleHeader>
      {extra}
    </StyledHeader>
  );
}
