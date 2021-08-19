import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
  Button,
  Navigation,
  Header,
  GalleryCard,
  GivingGoalCard,
  Movement,
  Text,
  Feedback,
} from 'src/client/components';
import DonorSiderLayout from 'src/client/layouts/DonorSiderLayout';
import { GIVING_SIDE_TYPES } from 'src/commons/constants/givingSideTypes';
import routes from 'src/commons/constants/routes';
import { Sections } from 'src/commons/constants/sectionTitles';

import {
  Container,
  Content,
  Donations,
  Section,
  CarouselContainer,
  CarouselContent,
  CoverLabel,
} from './styles';
type Props = {};

function handleOpenCreateModal() {}

const breadcrumbItems = [
  {
    href: routes.ROOT,
    title: 'Dashboard',
  },
  {
    href: routes.GIVES,
    title: 'Gives',
  },
];

const seeGalleryButton = (
  <Space>
    <Button type="primary" onClick={handleOpenCreateModal}>
      See Gallery
    </Button>
  </Space>
);

const DEFAULT_GIVING_SIDE = 'Strong';

export default function RootPage(props: RouteComponentProps<Props>) {
  const [givingSide, setGivingSide] = useState<string>(
    DEFAULT_GIVING_SIDE.toUpperCase()
  );

  const changeGivingSide = (value: String) => {
    const newValue = value.toUpperCase();
    setGivingSide(newValue);
  };

  const menu = (
    <Menu>
      {GIVING_SIDE_TYPES.map((type) => (
        <Menu.Item key={type}>
          <a onClick={() => changeGivingSide(type)}>{type}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <DonorSiderLayout breadcrumbItems={breadcrumbItems} pageTitle="Dashboard">
      <Container>
        <CoverLabel>
          <Text as={'h2'} color={'white'}>
            My Giving Side is
          </Text>
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <Text as={'h1'} color={'white'}>
                {givingSide} <DownOutlined />
              </Text>
            </a>
          </Dropdown>
        </CoverLabel>
        <Content>
          <Header title={Sections.HOME} />
          <Section>
            <GivingGoalCard />
            <CarouselContainer>
              <Donations autoplay>
                <CarouselContent>
                  <Text as={'subtitle1'} color={'white'}>
                    ”We make a living by what we get, but we make a life by what
                    we give.”
                  </Text>
                </CarouselContent>
                <CarouselContent>
                  <Text as={'subtitle1'} color={'white'}>
                    ”We make a living by what we get, but we make a life by what
                    we give.”
                  </Text>
                </CarouselContent>
              </Donations>
            </CarouselContainer>
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
          <Section>
            <Movement />
            <Feedback />
          </Section>
        </Content>
      </Container>
    </DonorSiderLayout>
  );
}
