import { Result } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { Button } from 'src/client/components';
import routes from 'src/commons/constants/routes';

export default function PageNotFound() {
  return (
    <Container>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" href={routes.ROOT}>
            Back Home
          </Button>
        }
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
