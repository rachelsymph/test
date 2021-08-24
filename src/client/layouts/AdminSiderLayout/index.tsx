import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { logout } from 'src/client/api/AuthApi';
import routes from 'src/commons/constants/routes';

import { LayoutStyle, Logo, LogoWrapper } from './styles';

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
  margin: '24px 16px',
  minHeight: 280,
  padding: 24,
};

const breadcrumbStyle = {
  marginBottom: '25px',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: 0,
};

const spanStyle = { color: '#999', marginRight: 4 };
const avatarStyle = { marginLeft: 8 };

const layoutStyle = { minHeight: '100vh' };

export default function AdminSiderLayout(props: Props) {
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
      <Layout style={layoutStyle}>
        <Sider
          collapsible
          breakpoint="md"
          collapsed={isCollapsed}
          collapsedWidth="0"
          trigger={null}
          width="230px"
          onCollapse={handleCollapse}
        >
          <LogoWrapper>
            <Logo src="/logo-white.png" />
          </LogoWrapper>
          <Menu
            theme="dark"
            selectedKeys={selectedMenuItems}
            onClick={handleClickSideMenu as any}
          >
            <Menu.Item key={routes.ROOT} icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key={routes.GIVES} icon={<DashboardOutlined />}>
              Gives
            </Menu.Item>
            <Menu.Item key={routes.RECIPIENTS} icon={<DashboardOutlined />}>
              Recipients
            </Menu.Item>
            <Menu.Item key={routes.PLATFORMS} icon={<DashboardOutlined />}>
              Platforms
            </Menu.Item>
            <Menu.Item key={routes.REGEXES} icon={<DashboardOutlined />}>
              Regexes
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={headerStyle}>
            {triggerDisplay}
            <Menu key="user" mode="horizontal" onClick={handleClickMenu}>
              <SubMenu
                title={
                  <>
                    <span style={spanStyle}>Hi,</span>
                    <span>Johnrey</span>
                    <Avatar
                      style={avatarStyle}
                      src="https://images.ctfassets.net/fyqb993shw99/7go7GRb7ZzJHkNYZfCyppg/0c8cd27be553b7887c1fb955664f03b8/Johnrey-_1.jpg?w=350"
                    />
                  </>
                }
              >
                <Menu.Item key="SignOut" onClick={handleClickSignout}>
                  Sign out
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Content className="site-layout-background" style={contentStyle}>
            <Breadcrumb style={breadcrumbStyle}>
              {breadcrumbItemsDisplay}
            </Breadcrumb>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
