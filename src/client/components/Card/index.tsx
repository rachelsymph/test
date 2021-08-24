import { CardProps } from 'antd';
import React from 'react';

import { StyledCard } from './styles';

type Props = Omit<CardProps, 'size' | 'type'> & {
  size?: any;
};

export default function Card(props: Props) {
  const { children, ...remainingProps } = props;
  return <StyledCard {...remainingProps}>{children}</StyledCard>;
}
