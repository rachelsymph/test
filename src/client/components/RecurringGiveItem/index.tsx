import React from 'react';

import { Text } from 'src/client/components';
import { Give, GiveSummary } from 'src/commons/types';

import {
  ColoredNumberContainer,
  GiveItemStyle,
  NumberContainer,
  Recipient,
} from './styles';

type Props = {
  iteration: number;
  give: GiveSummary;
  isTop?: boolean;
};

export default function RecurringGiveItem(props: Props) {
  const { iteration, give, isTop } = props;
  const count = iteration + 1;
  return (
    <GiveItemStyle>
      <Recipient>
        {isTop && (
          <ColoredNumberContainer>
            <Text as="caption1">{count}</Text>
          </ColoredNumberContainer>
        )}

        {!isTop && (
          <NumberContainer>
            <Text as="caption1">{count}</Text>
          </NumberContainer>
        )}
        <Text as="buttonMedium">{give.recipientName}</Text>
      </Recipient>
      <Text as="buttonRegular" color={'#0ABCC7'}>
        {give.totalAmountOfGives}
      </Text>
    </GiveItemStyle>
  );
}
