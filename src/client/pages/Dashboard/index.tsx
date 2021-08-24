import { Column } from '@ant-design/charts';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
  Button,
  Navigation,
  Header,
  Histogram,
  GalleryCard,
  GivingGoalCard,
  NumbersCard,
  Text,
  Section,
  DonationCarousel,
  Feedback,
  Card,
} from 'src/client/components';
import Historgram from 'src/client/components/Histogram';
import DonorSiderLayout from 'src/client/layouts/DonorSiderLayout';
import { BY_THE_NUMBERS_TITLES } from 'src/commons/constants/byTheNumbersTitles';
import { GIVING_SIDE_TYPES } from 'src/commons/constants/givingSideTypes';
import routes from 'src/commons/constants/routes';
import { Sections } from 'src/commons/constants/sectionTitles';

import {
  Container,
  Content,
  CoverLabel,
  GalleryStyled,
  GiveOverTime,
  NumberContainer,
  Recipient,
  RecurringGivesContainer,
  SummaryContent,
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

const DEFAULT_GIVING_SIDE = 'Strong';
const DEFAULT_NUMBER_OF_GIVES = 3;
const DEFAULT_TOTAL_AMOUNT_GIVES = '230.00';
const DEFAULT_RECIPIENT = 'Obama Campaign';
const DEFAULT_GIVE_COVER = 'covergallery.png';
const DEFAULT_BY_THE_NUMBERS_VALUE = '1,321';
const DEFAULT_PLATFORM_COVER = 'paypal.png';
const DEFAULT_PLATFORM = 'paypal';

const give = {
  numberOfGives: DEFAULT_NUMBER_OF_GIVES,
  totalAmountOfGives: DEFAULT_TOTAL_AMOUNT_GIVES,
  recipient: DEFAULT_RECIPIENT,
  cover: DEFAULT_GIVE_COVER,
};

const give2 = {
  totalAmountOfGives: DEFAULT_TOTAL_AMOUNT_GIVES,
  recipient: DEFAULT_RECIPIENT,
};

const gallerySectionStyle = {
  padding: '60px 30px',
  backgroundColor: '#F8FBFD',
};

const topPlatformsSectionStyle = {
  background: `url('/topCover.png')`,
  padding: '60px 30px',
};

const seeGalleryButton = (
  <Space>
    <Button type="primary" onClick={handleOpenCreateModal}>
      See Gallery
    </Button>
  </Space>
);

const giveSummary = (
  <Space>
    <SummaryContent>
      <Text as={'caption4'} color={'#193B4E'}>
        Average give amount &nbsp;
      </Text>
      <Text as={'caption5'}>$1000.00</Text>
    </SummaryContent>
    <SummaryContent>
      <Text as={'caption4'} color={'#193B4E'}>
        Median give amount &nbsp;
      </Text>
      <Text as={'caption5'}>$1000.00</Text>
    </SummaryContent>
  </Space>
);

const byTheNumbersContent = (
  <GalleryStyled>
    {BY_THE_NUMBERS_TITLES.map((title) => (
      <NumbersCard
        key={title}
        subtitle={title}
        value={DEFAULT_BY_THE_NUMBERS_VALUE}
      />
    ))}
  </GalleryStyled>
);

export default function DashboardPage(props: RouteComponentProps<Props>) {
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

  const homeContent = (
    <>
      <GivingGoalCard goal={400.0} currentDonations={100} />
      <DonationCarousel />
    </>
  );

  const galleryContent = (
    <GalleryStyled>
      <GalleryCard give={give} />
      <GalleryCard give={give} />
      <GalleryCard give={give} />
      <GalleryCard give={give2} />
      <GalleryCard give={give2} />
      <GalleryCard give={give2} />
      <GalleryCard give={give2} />
    </GalleryStyled>
  );

  const givingOverTimeContent = (
    <>
      <Historgram />
      <RecurringGivesContainer>
        <Text as="overline">Recurring Gives</Text>
        <GiveOverTime>
          <Recipient>
            <NumberContainer>
              <Text as="caption1">1</Text>
            </NumberContainer>
            <Text as="buttonMedium">{give.recipient}</Text>
          </Recipient>
          <Text as="buttonRegular" color={'#0ABCC7'}>
            {give.totalAmountOfGives}
          </Text>
        </GiveOverTime>
        <GiveOverTime>
          <Recipient>
            <NumberContainer>
              <Text as="caption1">2</Text>
            </NumberContainer>
            <Text as="buttonMedium">{give.recipient}</Text>
          </Recipient>
          <Text as="buttonRegular" color={'#0ABCC7'}>
            {give.totalAmountOfGives}
          </Text>
        </GiveOverTime>
        <GiveOverTime>
          <Recipient>
            <NumberContainer>
              <Text as="caption1">3</Text>
            </NumberContainer>
            <Text as="buttonMedium">{give.recipient}</Text>
          </Recipient>
          <Text as="buttonRegular" color={'#0ABCC7'}>
            {give.totalAmountOfGives}
          </Text>
        </GiveOverTime>
      </RecurringGivesContainer>
    </>
  );

  const typesOfGivingContent = (
    <>
      <Historgram />
    </>
  );

  const topPlatformsContent = (
    <GalleryStyled>
      <Card
        cover={<img alt={DEFAULT_PLATFORM} src={DEFAULT_PLATFORM_COVER} />}
      ></Card>
    </GalleryStyled>
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
            style={gallerySectionStyle}
          />
          <Section
            title={<Header title={Sections.GIVING_OVER_TIME} />}
            content={givingOverTimeContent}
          />
          <Section content={<DonationCarousel />} />
          <Section
            title={
              <Header
                title={Sections.BY_THE_NUMBERS}
                subtitle="On your civic or political journey"
                extra={giveSummary}
              />
            }
            content={byTheNumbersContent}
          />
          <Section
            title={<Header title={Sections.TYPES_OF_GIVING} />}
            content={typesOfGivingContent}
          />
          <Section
            title={<Header title={Sections.TOP_GIVING_PLATFORMS} />}
            content={topPlatformsContent}
            style={topPlatformsSectionStyle}
          />
          <Section content={<Feedback />} />
        </Content>
      </Container>
    </DonorSiderLayout>
  );
}
