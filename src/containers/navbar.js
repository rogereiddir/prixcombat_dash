import React, { Component } from 'react'
import {Layout, Menu , Icon} from 'antd';
const { Header } = Layout;

export default class navbar extends Component {
  render() {
    return (
      <Header className="header">
        <div style={{ color: '#fff' }} >
         <Icon type="home" />  Prixcombat Dashboard
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
         >
        </Menu>
      </Header>
    )
  }
}
