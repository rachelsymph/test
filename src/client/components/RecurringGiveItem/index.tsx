import React from 'react';

import { Text } from 'src/client/components';
import { GiveSummary } from 'src/commons/types/GiveSummary.type';

import {
  ColoredNumberContainer,
  GiveItemStyle,
  NumberContainer,
  Recipient,
} from './styles';
type Props = {
  iteration: number;
  give: GiveSummary;
};
export default function RecurringGiveItem(props: Props) {
  const { iteration, give } = props;
  const count = iteration + 1;
  return (
    <GiveItemStyle>
      <Recipient>
        {give.isTop && (
          <ColoredNumberContainer>
            <Text as="caption1">{count}</Text>
          </ColoredNumberContainer>
        )}

        {!give.isTop && (
          <NumberContainer>
            <Text as="caption1">{count}</Text>
          </NumberContainer>
        )}
        <Text as="buttonMedium">{give.recipient}</Text>
      </Recipient>
      <Text as="buttonRegular" color={'#0ABCC7'}>
        {give.totalAmountOfGives}
      </Text>
    </GiveItemStyle>
  );
}
