import React from 'react';
// 路由
import { Route, Link } from "react-router-dom";
import { BCG_ROOT_NAME, EQUIP } from '../constants/route-constants';
// 样式
import '../style/home.css'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


class HomeController extends React.Component {
  state = {
    isCollapse: true
  }
  render() {
    let route = [],
        menu = [];

    // 遍历出导航栏和路由组件
    for (let key in EQUIP.routes) {
      let item = EQUIP.routes[key];
      route.push(<Route key={`${item.path}`} path={`/${BCG_ROOT_NAME}/${item.path}`} component={item.component} />)
      menu.push(<Menu.Item key={item.path}>
        <Link to={`/${BCG_ROOT_NAME}/${item.path}`}>{item.name}</Link>
      </Menu.Item>);
    }

    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            let isCollapse = true;
            if (type === 'clickTrigger') isCollapse = collapsed
            this.setState({
              isCollapse
            });
          }}
          onBreakpoint={broken => {
            if (!broken) 
              this.setState({
                isCollapse: true
              });
          }}
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
                { menu }
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
        <Layout className="main-right-container">
          <div className={this.state.isCollapse ? '' : 'un-collapsed'}></div>
          <div className='main-container'>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '24px 16px 0', background: '#fff', padding: 20 }}>
              { route }
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </div>
        </Layout>
      </Layout>
    );
  }
}
export default HomeController;