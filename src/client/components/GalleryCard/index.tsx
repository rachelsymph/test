import { Space } from 'antd';
import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';

import { Card, Text } from 'src/client/components';

import { DetailContent, DetailsContainer, StyledGalleryCard } from './styles';

type Props = {
  numberOfGives?: number;
  totalAmountOfGives?: number;
  recipient?: string;
};

const DEFAULT_NUMBER_OF_GIVES = 3;
const DEFAULT_TOTAL_AMOUNT_GIVES = 230.0;
const DEFAULT_RECIPIENT = 'Obama Campaign';

export default function GalleryCard(props: Props) {
  const { colors } = useContext(ThemeContext);
  const {
    numberOfGives = DEFAULT_NUMBER_OF_GIVES,
    totalAmountOfGives = DEFAULT_TOTAL_AMOUNT_GIVES,
    recipient = DEFAULT_RECIPIENT,
  } = props;
  return (
    <Card cover={<img alt="example" src="covergallery.png" />}>
      <StyledGalleryCard>
        <Text as={'subtitle1'}>{recipient}</Text>
        <DetailsContainer>
          <DetailContent>
            <Text as={'buttonSize'}>No. of Gives</Text>
            <Text as={'subtitle1'} color={colors.gray1}>
              {numberOfGives}
            </Text>
          </DetailContent>
          <DetailContent>
            <Text as={'buttonSize'}>You have given</Text>
            <Text as={'subtitle1'} color={colors.teal2}>
              ${totalAmountOfGives}
            </Text>
          </DetailContent>
        </DetailsContainer>
      </StyledGalleryCard>
    </Card>
  );
}
