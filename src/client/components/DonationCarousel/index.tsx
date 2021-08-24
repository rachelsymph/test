import React from 'react';

import { Text } from 'src/client/components';
import { GiveSummary } from 'src/commons/types/GiveSummary.type';

import {
  CarouselContainer,
  CarouselContent,
  DonationDetailContent,
  Donations,
} from './styles';

type Props = {
  gives?: GiveSummary[];
};

export function DonationCarousel(props: Props) {
  const { gives } = props;
  return (
    <CarouselContainer>
      <Donations autoplay>
        {gives &&
          gives?.map((give) => (
            <DonationDetailContent key={give.recipient}>
              <Text as={'subtitle1'} color={'white'}>
                {give.recipient}
              </Text>
              <Text as={'subtitle2'} color={'white'}>
                You have given a total of {give.totalAmountOfGives}
              </Text>
            </DonationDetailContent>
          ))}
        {!gives && (
          <CarouselContent>
            <Text as={'subtitle1'} color={'white'}>
              ”We make a living by what we get, but we make a life by what we
              give.”
            </Text>
          </CarouselContent>
        )}
      </Donations>
    </CarouselContainer>
  );
}
