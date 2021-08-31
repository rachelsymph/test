import { DownOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row, Space } from 'antd';
import React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
  Button,
  DonationCarousel,
  Feedback,
  Header,
  GalleryCard,
  GivingGoalCard,
  Movement,
  Text,
  Section,
} from 'src/client/components';
import DonorSiderLayout from 'src/client/layouts/DonorSiderLayout';
import { GIVING_SIDE_TYPES } from 'src/commons/constants/givingSideTypes';
import routes from 'src/commons/constants/routes';
import { Sections } from 'src/commons/constants/sectionTitles';

import { Container, Content, CoverLabel, GalleryStyled } from './styles';
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

const DEFAULT_GIVING_SIDE = 'Strong';
const DEFAULT_NUMBER_OF_GIVES = 3;
const DEFAULT_TOTAL_AMOUNT_GIVES = 230.0;
const DEFAULT_RECIPIENT = 'Obama Campaign';
const DEFAULT_GIVE_COVER = 'covergallery.png';

const SAMPLE_GIVE = {
  numberOfGives: DEFAULT_NUMBER_OF_GIVES,
  totalAmountOfGives: DEFAULT_TOTAL_AMOUNT_GIVES,
  recipient: DEFAULT_RECIPIENT,
  cover: DEFAULT_GIVE_COVER,
  isTop: true,
};

const topGives = [SAMPLE_GIVE, SAMPLE_GIVE, SAMPLE_GIVE];

const seeGalleryButton = (
  <Space>
    <Button type="primary" onClick={handleOpenCreateModal}>
      See Gallery
    </Button>
  </Space>
);

const homeContent = (
  <>
    <GivingGoalCard />
    <DonationCarousel />
  </>
);

const galleryContent = (
  <GalleryStyled>
    <GalleryStyled>
      {topGives.map((give) => (
        <GalleryCard give={give} key={give.recipient} />
      ))}
    </GalleryStyled>
  </GalleryStyled>
);

const footerContent = (
  <>
    <Movement />
    <Feedback />
  </>
);

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
          <Section
            title={<Header title={Sections.HOME} />}
            content={homeContent}
          />
          <Section
            title={
              <Header
                title={Sections.GALLERY}
                subtitle="A collection of your help to lorem ipsum dolor"
                extra={seeGalleryButton}
              />
            }
            content={galleryContent}
          />
          <Section content={footerContent} />
        </Content>
      </Container>
    </DonorSiderLayout>
  );
}
