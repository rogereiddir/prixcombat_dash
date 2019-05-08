import React, { Component } from 'react';
import NavBar from './navbar';
import SideMenu from './sidemenu';
import { withRouter  } from "react-router-dom";
import { Layout } from 'antd';

const { Content, Footer } = Layout;


 class main extends Component {

  render() {
    return (
    <Layout style={{ minHeight: '100vh' }}>
          <NavBar/>
          <Layout>
            <SideMenu/>
            <Layout>
              <Content style={{ margin: '10px 16px' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    
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

export default withRouter(
  main
);