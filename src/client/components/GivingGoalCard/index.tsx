import { Space } from 'antd';
import React from 'react';

import { Button, Card, Header } from 'src/client/components';

import routes from 'src/commons/constants/routes';

import { Icon, StyledGoalCard } from './styles';

type Props = {
  goal?: number;
  isEdit?: boolean;
};

const buttonStyle = {
  minWidth: '172px',
};

export default function GivingGoalCard(props: Props) {
  return (
    <Card>
      <StyledGoalCard>
        <Icon src="bird.png" />
        <Header
          title="Giving Goal"
          as="h5"
          subtitle="
                You haven’t set your giving goal for this year. Try to set a goal
                real quick!"
        />
        <Space>
          <Button href={routes.ROOT} style={buttonStyle} type="primary">
            Set a Giving Goal
          </Button>
        </Space>
      </StyledGoalCard>
    </Card>
  );
}
