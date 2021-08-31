import { DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import {
  Col,
  Dropdown,
  Menu,
  Popconfirm,
  Radio,
  Row,
  Space,
  Table,
} from 'antd';

import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import {
  Button,
  DonationCarousel,
  Feedback,
  GalleryCard,
  GivingGoalCard,
  Header,
  Navigation,
  NumbersCard,
  PlatformCard,
  RadioButtonGroup,
  RecurringGiveItem,
  Section,
  Text,
} from 'src/client/components';
import Histogram from 'src/client/components/Histogram';
import { useGetGives } from 'src/client/hooks/queries';
import DonorSiderLayout from 'src/client/layouts/DonorSiderLayout';
import { transformToTable } from 'src/client/utils/GiveUtils';
import { BY_THE_NUMBERS_TITLES } from 'src/commons/constants/byTheNumbersTitles';
import { ChartFields } from 'src/commons/constants/fields';
import { GIVING_SIDE_TYPES } from 'src/commons/constants/givingSideTypes';
import routes from 'src/commons/constants/routes';
import { Sections } from 'src/commons/constants/sectionTitles';
import { Indexable } from 'src/commons/types/Indexable.type';

import {
  Container,
  Content,
  CoverLabel,
  GalleryStyled,
  RecurringGivesContainer,
  RecurringGivesList,
  SectionContentStyled,
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
const DEFAULT_TOTAL_AMOUNT_GIVES = 230.0;
const DEFAULT_RECIPIENT = 'Obama Campaign';
const DEFAULT_GIVE_COVER = 'covergallery.png';
const DEFAULT_BY_THE_NUMBERS_VALUE = '1,321';
const DEFAULT_PLATFORM_COVER = 'paypal.png';
const DEFAULT_PLATFORM = 'paypal';

const SAMPLE_GIVE = {
  numberOfGives: DEFAULT_NUMBER_OF_GIVES,
  totalAmountOfGives: DEFAULT_TOTAL_AMOUNT_GIVES,
  recipient: DEFAULT_RECIPIENT,
  cover: DEFAULT_GIVE_COVER,
  isTop: true,
};

const SAMPLE_GIVE2 = {
  totalAmountOfGives: 400.0,
  recipient: 'Glory Reborn',
};

const latestGives = [SAMPLE_GIVE, SAMPLE_GIVE, SAMPLE_GIVE, SAMPLE_GIVE2];
const topGives = [
  SAMPLE_GIVE,
  SAMPLE_GIVE,
  SAMPLE_GIVE,
  SAMPLE_GIVE2,
  SAMPLE_GIVE2,
  SAMPLE_GIVE2,
  SAMPLE_GIVE2,
];

const platform = {
  id: DEFAULT_PLATFORM_COVER,
  dateCreated: new Date('2019-01-16'),
  dateUpdated: new Date('2019-01-16'),
  isDeleted: false,
  keywords: [],
  cover: DEFAULT_PLATFORM_COVER,
  domainName: DEFAULT_PLATFORM,
  isSyncing: true,
  name: DEFAULT_PLATFORM,
};

const gallerySectionStyle = {
  padding: '60px 30px',
  backgroundColor: '#F8FBFD',
};

const topPlatformsSectionStyle = {
  background: `url('/topCover.png')`,
  backgroundSize: 'cover',
  padding: '60px 30px',
};

const showAllGivesButton = (
  <Col xs={{ span: 0 }} lg={{ push: 10, span: 4 }}>
    <Space>
      <Button type="primary" onClick={handleOpenCreateModal}>
        Show all Gives
      </Button>
    </Space>
  </Col>
);

const giveSummary = (
  <Col xs={{ span: 0 }} lg={{ span: 12, push: 1 }}>
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
  </Col>
);

type MakeColumnParams = {
  onClickEdit: (giveId: string) => void;
  onConfirmDelete: (giveId: string) => void;
};

function makeColumns(params: MakeColumnParams) {
  const { onClickEdit, onConfirmDelete } = params;

  return [
    {
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      title: 'Date',
    },
    {
      dataIndex: 'recipient',
      key: 'recipient',
      title: 'Recipient',
    },
    {
      dataIndex: 'note',
      key: 'note',
      title: 'Note',
    },
    {
      dataIndex: 'contributed',
      key: 'contributed',
      title: 'Contributed',
    },
    {
      dataIndex: 'taxDeductible',
      key: 'taxDeductible',
      title: 'Tax Deductible',
    },
    {
      key: 'action',
      title: 'Actions',
      render: (text: string, record: Indexable) => {
        function handleConfirmDelete() {
          onConfirmDelete(record.id);
        }

        function handleClickEdit() {
          onClickEdit(record.id);
        }

        return (
          <Space size="small">
            <Button
              size="small"
              type="primary-outline"
              onClick={handleClickEdit}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Are you sure delete this group?"
              onConfirm={handleConfirmDelete}
            >
              <Button size="small" type="primary-outline">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
}

export default function DashboardPage(props: RouteComponentProps<Props>) {
  const { data, isLoading } = useGetGives();
  const [givingSide, setGivingSide] = useState<string>(
    DEFAULT_GIVING_SIDE.toUpperCase()
  );

  function handleConfirmDelete(giveId: string) {}

  function handleClickEdit(giveId: string) {}

  const columns = makeColumns({
    onClickEdit: handleClickEdit,
    onConfirmDelete: handleConfirmDelete,
  });

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
      <Col xs={{ span: 24 }} lg={{ span: 9 }}>
        <GivingGoalCard goal={400.0} currentDonations={100} />
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 15 }}>
        <DonationCarousel gives={latestGives} />
      </Col>
    </>
  );

  const givingOverTimeContent = (
    <Row>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <Histogram
          data={topGives}
          xField={ChartFields.RECIPIENT}
          yField={ChartFields.TOTAL_AMOUNT_OF_GIVES}
        />
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 12 }}>
        <RecurringGivesContainer>
          <Text as="overline">Recurring Gives</Text>
          <RecurringGivesList>
            {topGives.map((give, key) => (
              <RecurringGiveItem key={key} iteration={key} give={give} />
            ))}
          </RecurringGivesList>
        </RecurringGivesContainer>
      </Col>
    </Row>
  );

  const byTheNumbersContent = (
    <Row>
      {BY_THE_NUMBERS_TITLES.map((title) => (
        <NumbersCard
          key={title}
          subtitle={title}
          value={DEFAULT_BY_THE_NUMBERS_VALUE}
        />
      ))}
    </Row>
  );

  const typesOfGivingContent = (
    <Row>
      <Col span={24}>
        <Histogram
          data={topGives}
          xField={ChartFields.GIVING_TYPE}
          yField={ChartFields.TOTAL_AMOUNT_OF_GIVES}
        />
      </Col>
    </Row>
  );

  const yourYearGivesContent = (
    <Row>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={data?.data.map(transformToTable)}
          loading={isLoading}
          pagination={{ pageSize: 5 }}
          scroll={{ y: 300 }}
        />
      </Col>
    </Row>
  );

  const topPlatformsContent = (
    <Row>
      <Col xs={{ span: 12 }} xl={{ span: 6 }}>
        <PlatformCard platform={platform} />
      </Col>
      <Col xs={{ span: 12 }} xl={{ span: 6 }}>
        <PlatformCard platform={platform} />
      </Col>
      <Col xs={{ span: 12 }} xl={{ span: 6 }}>
        <PlatformCard platform={platform} />
      </Col>
      <Col xs={{ span: 12 }} xl={{ span: 6 }}>
        <PlatformCard platform={platform} />
      </Col>
    </Row>
  );

  function onChange(e: any) {}

  const radioGroupGallery = (
    <RadioButtonGroup
      value1={'Amount'}
      value2={'Frequency'}
      onChange={onChange}
    />
  );

  const radioGroupGivingOverTime = (
    <RadioButtonGroup value1={'Amount'} value2={'Time'} onChange={onChange} />
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
                extra={radioGroupGallery}
              />
            }
            content={
              <>
                <GalleryStyled>
                  {topGives.map((give) => (
                    <GalleryCard give={give} key={give.recipient} />
                  ))}
                </GalleryStyled>
                {showAllGivesButton}
              </>
            }
            style={gallerySectionStyle}
          />
          <Section
            content={givingOverTimeContent}
            borded={true}
            title={
              <Header
                extra={radioGroupGivingOverTime}
                title={Sections.GIVING_OVER_TIME}
              />
            }
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
            title={<Header title={Sections.YOUR_2021_GIVES} />}
            content={yourYearGivesContent}
          />
          <Section
            title={<Header title={Sections.TYPES_OF_GIVING} />}
            content={typesOfGivingContent}
            borded={true}
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
