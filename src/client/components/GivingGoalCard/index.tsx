import { Input, Progress, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { Button, Card, Header, Text } from 'src/client/components';

import { ActionContainer, Icon, Line, StyledGoalCard } from './styles';

type Props = {
  goal?: number;
  isEdit?: boolean;
  currentDonations?: number;
};

const buttonStyle = {
  minWidth: '172px',
};

const superGoalButtonStyle = {
  color: '#13C2C2',
};

function getPercentage(value: number | undefined, total: number | undefined) {
  if (value && total) {
    return (value / total) * 100;
  } else {
    return undefined;
  }
}

export default function GivingGoalCard(props: Props) {
  const { goal, currentDonations = 100 } = props;
  const [editGoal, setEditGoal] = useState<boolean>(false);
  const [newGoal, setNewGoal] = useState<Number>();
  const [finalGoal, setFinalGoal] = useState<Number>();

  useEffect(() => {
    if (!finalGoal) {
      setFinalGoal(goal);
    }
  });

  const progress = getPercentage(currentDonations, goal);

  function goalChangeHandler(value: Number) {
    setNewGoal(value);
  }

  function changeNewGoal(event: any) {
    setFinalGoal(Number(newGoal));
    setEditGoal(false);
    event.preventDefault();
  }

  function editGoalHandler(event: any) {
    setEditGoal(true);
    event.preventDefault();
  }

  return (
    <Card>
      <StyledGoalCard>
        <Icon src="bird.png" />
        {!finalGoal && !editGoal && (
          <>
            <Header
              as="h5"
              subtitle="
                You haven’t set your giving goal for this year. Try to set a goal
                real quick!"
              title="Giving Goal"
            />
            <Space>
              <Button
                onClick={(e) => editGoalHandler(e)}
                style={buttonStyle}
                type="primary"
              >
                Set a Giving Goal
              </Button>
            </Space>
          </>
        )}

        {editGoal && (
          <>
            <Header
              as="h5"
              subtitle="
                You haven’t set your giving goal for this year. Try to set a goal
                real quick!"
              title="Giving Goal"
            />
            <Space>
              <Input
                placeholder="0.00"
                onChange={(e) => goalChangeHandler(Number(e.target.value))}
              />
              <Button
                onClick={(e) => changeNewGoal(e)}
                style={buttonStyle}
                type="primary"
              >
                Save Goal
              </Button>
            </Space>
          </>
        )}

        {finalGoal && !editGoal && (
          <>
            <Header
              title="Giving Goal"
              as="h5"
              subtitle="You blew through your goal of $100 for the year, help some more by bumping up that goal!"
            />
            <Text as={'h4'}>${finalGoal}</Text>
            <Progress
              percent={progress}
              showInfo={false}
              strokeColor={'#0ABCC7'}
            />
            <Line />
            <ActionContainer>
              <Button type="text" onClick={(e) => editGoalHandler(e)}>
                Edit Goal
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                }}
                type="text"
                style={superGoalButtonStyle}
              >
                Set a Super Goal
              </Button>
            </ActionContainer>
          </>
        )}
      </StyledGoalCard>
    </Card>
  );
}
