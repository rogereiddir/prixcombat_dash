import React, { Component } from 'react';
import NavBar from './navbar';
import SideMenu from './sidemenu';
import { Layout } from 'antd';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const { Content, Footer } = Layout;


 class main extends Component {
 componentWillUnmount(){
        console.log('ok')
      }
  render() {
    let path = this.props.location.pathname.split('/')[1]
    return (
    <Layout style={{ minHeight: '100vh' }}>
          <NavBar/>
          <Layout>
            <SideMenu path={path}/>
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

export default withRouter(
  connect()(main)
);