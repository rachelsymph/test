import { Space } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
  Button,
  Navigation,
  Header,
  GivingGoalCard,
  Card,
} from 'src/client/components';
import GalleryCard from 'src/client/components/GalleryCard';
import { Sections } from 'src/commons/constants/sectionTitles';

import { Container, Content, Cover, Donations, Section } from './styles';
type Props = {};

const contentStyle = {
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center' as const,
  background: '#364d79',
};

function handleOpenCreateModal() {}

const seeGalleryButton = (
  <Space>
    <Button type="primary" onClick={handleOpenCreateModal}>
      See Gallery
    </Button>
  </Space>
);

export default function RootPage(props: RouteComponentProps<Props>) {
  return (
    <Container>
      <Navigation />
      <Cover src="cover.png" />
      <Content>
        <Header title={Sections.HOME} />
        <Section>
          <GivingGoalCard />
          <Donations autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
          </Donations>
        </Section>
        <Header
          title={Sections.GALLERY}
          subtitle="A collection of your help to lorem ipsum dolor"
          extra={seeGalleryButton}
        />
        <Section>
          <GalleryCard />
          <GalleryCard />
          <GalleryCard />
        </Section>
      </Content>
    </Container>
  );
}
