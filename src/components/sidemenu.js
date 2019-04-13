import React, { Component } from 'react'
import {
    Layout, Menu, Icon,
  } from 'antd';
const { Sider } = Layout;
  
const SubMenu = Menu.SubMenu;
export default class sidemenu extends Component {
    state = {
        collapsed: false,
    };
        
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
  render() {
    return (
     <Sider 
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        width={200} style={{ background: '#fff' }}>
         <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
             <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>Option 1</span>
             </Menu.Item>
             <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Option 2</span>
             </Menu.Item>
              <SubMenu key="sub1" title={<span><Icon type="user" /><span>subnav 1</span></span>}>
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" /><span>subnav 1</span></span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" /><span>subnav 1</span></span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
        </Sider>
    )
  }
}
