import { Space } from 'antd';
import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';

import { Card, Text } from 'src/client/components';

import { GiveSummary } from 'src/commons/types/GiveSummary.type';

import { DetailContent, DetailsContainer, StyledGalleryCard } from './styles';

type Props = {
  give?: GiveSummary;
};

export default function GalleryCard(props: Props) {
  const { colors } = useContext(ThemeContext);
  const { give } = props;
  const numberOfGives = give?.numberOfGives;
  const totalAmountOfGives = give?.totalAmountOfGives;
  const recipient = give?.recipient;
  const cover = give?.cover;

  return (
    <Card cover={cover && <img alt={recipient} src={cover} />}>
      <StyledGalleryCard>
        <Text as={'subtitle1'}>{recipient}</Text>
        <DetailsContainer>
          {numberOfGives && (
            <DetailContent>
              <Text as={'buttonRegular'}>No. of Gives</Text>
              <Text as={'subtitle1'} color={colors.gray1}>
                {numberOfGives}
              </Text>
            </DetailContent>
          )}
          <DetailContent>
            <Text as={'buttonRegular'}>You have given</Text>
            <Text as={'subtitle1'} color={colors.teal2}>
              ${totalAmountOfGives}
            </Text>
          </DetailContent>
        </DetailsContainer>
      </StyledGalleryCard>
    </Card>
  );
}
