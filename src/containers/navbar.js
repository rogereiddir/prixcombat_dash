import React, { Component } from 'react'
import {Layout , Icon, Typography } from 'antd';
const { Title } = Typography;
const { Header } = Layout;

export default class navbar extends Component {
  render() {
    return (
      <Header className="header">
       
        <Title className="logo"  level={3} style={{ color: '#fff' }}> <Icon type="home" />  Prixcombat Dashboard </Title>
     
        {/* <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
         >
        </Menu> */}
      </Header>
    )
  }
}
