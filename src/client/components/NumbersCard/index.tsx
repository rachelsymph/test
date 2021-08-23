import React from 'react';

import { Card, Text } from 'src/client/components';

import { NumbersCardStyle } from './styles';

type Props = {
  subtitle?: string;
  value?: string;
};

export default function NumbersCard(props: Props) {
  const { subtitle, value } = props;
  return (
    <Card>
      <NumbersCardStyle>
        <Text as={'subtitle2'} color={'#0ABCC7'}>
          {subtitle}
        </Text>
        <Text as={'h3'}>{value}</Text>
      </NumbersCardStyle>
    </Card>
  );
}
