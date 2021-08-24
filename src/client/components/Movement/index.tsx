import React from 'react';

import { Card, Header } from 'src/client/components';

import { StyledMovement } from './styles';

export default function Movement() {
  return (
    <Card>
      <StyledMovement>
        <Header
          title="Movement"
          subtitle="See a timeline of all you do. Allow yourself moments of remembrance and reflection around your giving commitments"
          titleColor="white"
          subtitleColor="white"
        />
      </StyledMovement>
    </Card>
  );
}
