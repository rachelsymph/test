import {
  BellOutlined,
  DashboardOutlined,
  DownOutlined,
  FundOutlined,
  HeatMapOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SlidersOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Space } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { logout } from 'src/client/api/AuthApi';
import { Navigation } from 'src/client/components';
import routes from 'src/commons/constants/routes';

import { LayoutStyle, Logo, LogoWrapper, MenuStyle } from './styles';

type BreadcrumbItem = {
  href?: string;
  title: string;
};

type Props = {
  children: React.ReactNode | React.ReactNodeArray;
  pageTitle: string;
  breadcrumbItems: BreadcrumbItem[];
};

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const contentStyle = {
  background: 'none',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: 0,
  background: '#11182C',
};

const spanStyle = { color: '#fff', marginRight: 4 };
const avatarStyle = { marginRight: 8 };
const siderStyle = { backgroundColor: '#193B4E' };
const iconStyle = { color: '#fff' };

const layoutStyle = { minHeight: '100vh', backgroundColor: '#193B4E' };

export default function DonorSiderLayout(props: Props) {
  const { breadcrumbItems, children } = props;
  const history = useHistory();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([
    history.location.pathname,
  ]);

  useEffect(() => {
    history.push(selectedMenuItems[0]);
  }, [history, selectedMenuItems]);

  function handleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  function handleClickMenu() {}

  function handleClickSideMenu(evt: MenuInfo) {
    setSelectedMenuItems((evt.keyPath as unknown) as string[]);

    history.push((evt.key as unknown) as string);
  }

  async function handleClickSignout() {
    await logout();

    window.location.reload();
  }

  const triggerDisplay = isCollapsed ? (
    <MenuUnfoldOutlined className="trigger" onClick={handleCollapse} />
  ) : (
    <MenuFoldOutlined className="trigger" onClick={handleCollapse} />
  );

  const breadcrumbItemsDisplay = breadcrumbItems.map((breadcrumbItem) => (
    <Breadcrumb.Item href={breadcrumbItem.href} key={breadcrumbItem.title}>
      {breadcrumbItem.title}
    </Breadcrumb.Item>
  ));

  return (
    <>
      <LayoutStyle />
      <Navigation />
      <Layout style={layoutStyle}>
        <Sider
          collapsible
          breakpoint="md"
          collapsed={isCollapsed}
          collapsedWidth="0"
          trigger={null}
          width="50px"
          onCollapse={handleCollapse}
          style={siderStyle}
        >
          <MenuStyle
            selectedKeys={selectedMenuItems}
            onClick={handleClickSideMenu as any}
          >
            <Menu.Item
              key={routes.ROOT}
              icon={<DashboardOutlined style={iconStyle} />}
            />
            <Menu.Item
              key={routes.GIVES}
              icon={<HomeOutlined style={iconStyle} />}
            />
            <Menu.Item
              key={routes.RECIPIENTS}
              icon={<HeatMapOutlined style={iconStyle} />}
            />
            <Menu.Item
              key={routes.PLATFORMS}
              icon={<SlidersOutlined style={iconStyle} />}
            />
            <Menu.Item
              key={routes.REGEXES}
              icon={<FundOutlined style={iconStyle} />}
            />
          </MenuStyle>
        </Sider>
        <Layout className="site-layout">
          <Content className="site-layout-background" style={contentStyle}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
