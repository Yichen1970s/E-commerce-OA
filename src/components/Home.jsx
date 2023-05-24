import style from "./Home.module.css";
import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from 'react-router-dom';


const { Header, Sider, Content } = Layout;

const Home = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // console.log('usertoken:'+user.userInfo.token);
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
    getItem("首页", "1", <AppstoreOutlined />, [
      getItem("欢迎页", "1-1", <UserOutlined />),
    ]),
    getItem("用户管理", "2", <UploadOutlined />, [
      getItem("用户列表", "2-1", <UserOutlined />),
    ]),
    getItem("商品管理", "4", <VideoCameraOutlined />, [
      getItem("商品列表", "4-1"),
      getItem("分类参数", "4-2"),
      getItem("商品分类", "4-3"),
    ]),
    getItem("订单管理", "5", <AppstoreOutlined />, [
      getItem("订单列表", "5-1"),
    ]),

  ]
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={style.title} ><span style= {collapsed?{display:'none'}:{}}>电商管理平台</span></div>
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
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default Home;