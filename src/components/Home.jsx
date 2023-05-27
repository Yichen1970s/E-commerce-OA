
import style from './Home.module.css'
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";


const { Header, Sider, Content } = Layout;

const Home = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('首页', '1', <AppstoreOutlined />, [
      getItem(<Link to={'welcome'}>欢迎页</Link>, '1-1', <UserOutlined />),
    ]),
    getItem('用户管理', '2', <UploadOutlined />, [
      getItem(<Link to={'users'}>用户列表</Link>, '2-1'),
    ]),
    getItem('权限管理', '3', <UserOutlined />, [
      getItem(<Link to={'roles'}>角色列表</Link>, '3-1'),
      getItem(<Link to={'rights'}>权限列表</Link>, '3-2'),
    ]),
    getItem('商品管理', '4', <VideoCameraOutlined />, [
      getItem(<Link to={'goods'}>商品列表</Link>, '4-1'),
      getItem(<Link to={'params'}>分类参数</Link>, '4-2'),
      getItem(<Link to={'categories'}>商品分类</Link>, '4-3'),
    ]),
    getItem('订单管理', '5', <AppstoreOutlined />, [
      getItem(<Link to={'orders'}>订单列表</Link>, '5-1'),

    ])
  ]
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={style.title} ><span style={collapsed ? { display: 'none' } : {}}>电商管理平台</span></div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
        />
      </Sider>
      <Layout className={style.mainAll}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow:'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;