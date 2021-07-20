import { Divider } from 'antd';
import React from 'react';

import { Button } from 'src/client/components';
import routes from 'src/commons/constants/routes';

import { Container, Logo, Nav } from './styles';

const buttonStyle = {
  minWidth: '120px',
};

export default function Navigation() {
  return (
    <Container>
      <Nav>
        <Logo src="logo.png" />
        <Button
          href={routes.LOGIN}
          size="large"
          style={buttonStyle}
          type="primary"
        >
          Log in
        </Button>
      </Nav>
      <Divider />
    </Container>
  );
}
