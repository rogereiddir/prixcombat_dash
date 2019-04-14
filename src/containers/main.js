import React, { Component } from 'react';
import Navbar from './navbar';
import Sidemenu from './sidemenu';
import { Layout } from 'antd';
const { Content, Footer } = Layout;


export default class main extends Component {

  render() {
    return (
    <Layout style={{ minHeight: '100vh' }}>
        <Navbar/>
        <Layout>
          <Sidemenu onCollapse={this.onCollapse} />
          <Layout>
            <Content style={{ margin: '10px 16px' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  {this.props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Prixcombat ©2019 Created by Abdeljalil
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
