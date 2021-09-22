import { DownOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Space } from 'antd';

import React, { useEffect, useState } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import {
  Button,
  DonationCarousel,
  Feedback,
  GalleryCard,
  GivingGoalCard,
  Header,
  Movement,
  Navigation,
  RadioButtonGroup,
  Section,
  Text,
} from 'src/client/components';
import { useGetGives } from 'src/client/hooks/queries';
import DonorSiderLayout from 'src/client/layouts/DonorSiderLayout';
import { getRecipientGives } from 'src/client/utils/GiveUtils';
import { GIVING_SIDE_TYPES } from 'src/commons/constants/givingSideTypes';
import routes from 'src/commons/constants/routes';
import { Sections } from 'src/commons/constants/sectionTitles';
import { GiveSummary } from 'src/commons/types';

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
const IS_TOP_LIMIT = 3;
const TOP_FOUR_DISPLAY = 4;

const SAMPLE_GIVE = {
  numberOfGives: DEFAULT_NUMBER_OF_GIVES,
  totalAmountOfGives: DEFAULT_TOTAL_AMOUNT_GIVES,
  recipientName: DEFAULT_RECIPIENT,
  cover: DEFAULT_GIVE_COVER,
  isTop: true,
};

const SAMPLE_GIVE2 = {
  totalAmountOfGives: 400.0,
  recipientName: 'Glory Reborn',
};

const topGives = [
  SAMPLE_GIVE,
  SAMPLE_GIVE,
  SAMPLE_GIVE,
  SAMPLE_GIVE2,
  SAMPLE_GIVE2,
  SAMPLE_GIVE2,
  SAMPLE_GIVE2,
];

const gallerySectionStyle = {
  padding: '60px 30px',
  backgroundColor: '#F8FBFD',
};

export default function DashboardPage(props: RouteComponentProps<Props>) {
  const { data, isLoading } = useGetGives();
  const [givingSide, setGivingSide] = useState<string>(
    DEFAULT_GIVING_SIDE.toUpperCase()
  );
  const [recipientGivesSummary, setRecipientGivesSummary] = useState<
    GiveSummary[]
  >();

  useEffect(() => {
    if (data) {
      const givesData = data.data;
      const recipientGivesSummary = getRecipientGives(givesData);
      setRecipientGivesSummary(recipientGivesSummary);
    }
  }, []);

  const changeGivingSide = (value: String) => {
    const newValue = value.toUpperCase();
    setGivingSide(newValue);
  };

  const menu = (
    <Menu>
      {GIVING_SIDE_TYPES.map((type, key) => (
        <Menu.Item key={key}>
          <a onClick={() => changeGivingSide(type)}>{type}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const homeContent = (
    <>
      <Col xs={{ span: 24 }} lg={{ span: 9 }}>
        <GivingGoalCard goal={400.0} currentDonations={100} />
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 15 }}>
        <DonationCarousel gives={topGives?.slice(0, TOP_FOUR_DISPLAY)} />
      </Col>
    </>
  );

  function onChange(e: any) {}

  const radioGroupGallery = (
    <RadioButtonGroup
      value1={'Amount'}
      value2={'Frequency'}
      onChange={onChange}
    />
  );

  const seeGalleryButton = (
    <Space>
      <Button type="primary" onClick={handleOpenCreateModal}>
        See Gallery
      </Button>
    </Space>
  );

  const radioGroupHome = (
    <RadioButtonGroup
      value1={'This Year'}
      value2={'All Time'}
      onChange={onChange}
    />
  );

  return (
    <DonorSiderLayout breadcrumbItems={breadcrumbItems} pageTitle="Dashboard">
      <Container>
        <Navigation />
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
            title={<Header extra={radioGroupHome} title={Sections.HOME} />}
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
            content={
              <>
                <GalleryStyled>
                  {recipientGivesSummary
                    ?.slice(0, IS_TOP_LIMIT)
                    .map((give, key) => (
                      <GalleryCard give={give} key={key} isTop={true} />
                    ))}
                </GalleryStyled>
              </>
            }
            style={gallerySectionStyle}
          />
          <Section
            content={
              <>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Movement />
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Feedback />{' '}
                </Col>
              </>
            }
          />
        </Content>
      </Container>
    </DonorSiderLayout>
  );
}
