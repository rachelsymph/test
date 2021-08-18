import React from 'react';

import { Button, Card, Text } from 'src/client/components';

import routes from 'src/commons/constants/routes';

import { StyledFeedback } from './styles';

const buttonStyle = {
  minWidth: '172px',
};

export default function Feedback() {
  return (
    <Card>
      <StyledFeedback>
        <Text as={'caption1'} color="white">
          Do you have questions or feedback? We’re building and learning and we
          would love to hear from you!
        </Text>
        <Button href={routes.ROOT} style={buttonStyle} type="primary">
          Send us a Note
        </Button>
      </StyledFeedback>
    </Card>
  );
}
