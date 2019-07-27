import React from 'react';
// 路由
import { Route, Link } from "react-router-dom";
import { BCG_ROOT_Name, EQUIP } from '../constants/route-constants';
// 样式
import '../style/home.css'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


class HomeController extends React.Component {
  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            <Menu.SubMenu
                key="1"
                title={
                  <span>
                    <Icon type="money-collect" />
                    <span className="nav-text">勇者装备商店</span>
                  </span>
                }
              >
                {EQUIP.routes.map(item => 
                  (<Menu.Item key={item.path}>
                    <Link to={`/${BCG_ROOT_Name}/${item.path}`}>{item.name}</Link>
                  </Menu.Item>)
                )}
            </Menu.SubMenu>
            <Menu.Item key="2">
              <Icon type="smile" />
              <span className="nav-text">狼狼画廊</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="coffee" />
              <span className="nav-text">没想好</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            {EQUIP.routes.map(item => 
              (<Route key={`${item.path}`} path={`/${BCG_ROOT_Name}/${item.path}`} component={item.component} />)
            )}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default HomeController;