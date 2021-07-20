import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Navigation } from 'src/client/components';

import { Container, Content } from './styles';

type Props = {};

export default function RootPage(props: RouteComponentProps<Props>) {
  return (
    <Container>
      <Navigation />
      <Content></Content>
    </Container>
  );
}
