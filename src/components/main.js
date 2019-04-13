import React, { Component } from 'react';
import Navbar from './navbar';
import Sidemenu from './sidemenu';

import {
    Layout,Breadcrumb,
} from 'antd';
const {
    Content, Footer,
} = Layout;


export default class main extends Component {

  render() {
    return (
    <Layout style={{ minHeight: '100vh' }}>
        <Navbar/>
        <Layout>
          <Sidemenu onCollapse={this.onCollapse} />
          <Layout>
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  {this.props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
