import { Input, Progress, Space } from 'antd';
import React from 'react';
import { useState } from 'react';
import { handleInputChange } from 'react-select/src/utils';

import { Button, Card, Header, Text } from 'src/client/components';

import routes from 'src/commons/constants/routes';

import { Icon, StyledGoalCard } from './styles';

type Props = {
  goal?: number;
  isEdit?: boolean;
  currentDonations?: number;
};

const buttonStyle = {
  minWidth: '172px',
};

function getPercentage(value: number | undefined, total: number | undefined) {
  if (value && total) {
    return (value / total) * 100;
  } else {
    return undefined;
  }
}

export default function GivingGoalCard(props: Props) {
  const { goal, currentDonations } = props;
  const [isSetGoal, setIsSetGoal] = useState<boolean>(false);
  const [newGoal, setNewGoal] = useState<Number>();

  const progress = getPercentage(currentDonations, goal);

  function handleGoalChange(value: Number) {
    setNewGoal(value);
  }

  return (
    <Card>
      <StyledGoalCard>
        <Icon src="bird.png" />
        {!goal && !isSetGoal && (
          <>
            <Header
              title="Giving Goal"
              as="h5"
              subtitle="
                You haven’t set your giving goal for this year. Try to set a goal
                real quick!"
            />
            <Space>
              <Button
                href={routes.ROOT}
                style={buttonStyle}
                type="primary"
                onClick={(e) => {
                  setIsSetGoal(true);
                  e.preventDefault();
                }}
              >
                Set a Giving Goal
              </Button>
            </Space>
          </>
        )}
        {isSetGoal && (
          <>
            <Header
              title="Giving Goal"
              as="h5"
              subtitle="
                You haven’t set your giving goal for this year. Try to set a goal
                real quick!"
            />
            <Space>
              <Input
                placeholder="0.00"
                onChange={(e) => handleGoalChange(Number(e.target.value))}
              />
              <Button
                href={routes.ROOT}
                style={buttonStyle}
                type="primary"
                onClick={(e) => {
                  setIsSetGoal(false);
                  e.preventDefault();
                }}
              >
                Save Goal
              </Button>
            </Space>
          </>
        )}
        {goal && (
          <>
            <Header
              title="Giving Goal"
              as="h5"
              subtitle="You blew through your goal of $100 for the year, help some more by bumping up that goal!"
            />
            <Text as={'h4'}>${goal}</Text>
            <Progress
              percent={progress}
              showInfo={false}
              strokeColor={'#0ABCC7'}
            />
          </>
        )}
      </StyledGoalCard>
    </Card>
  );
}
