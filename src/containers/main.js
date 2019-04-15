import React, { Component } from 'react';
import Navbar from './navbar';
import Sidemenu from './sidemenu';
import { Layout } from 'antd';
import { connect } from "react-redux";
import {Switch, Route ,withRouter } from "react-router-dom";
import ProductsList from '../components/productslist';
import CategoriesList from '../components/categorylist';
const { Content, Footer } = Layout;


 class main extends Component {
 
  render() {
    let path = this.props.location.pathname.split('/')[1]
    return (
    <Layout style={{ minHeight: '100vh' }}>
          <Navbar/>
          <Layout>
            <Sidemenu path={path}/>
            <Layout>
              <Content style={{ margin: '10px 16px' }}>
                  <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  <Switch>
                    <Route
                      exact
                      path="/products"
                      render={props => <ProductsList {...props} />}
                    />
                    <Route
                      exact
                      path="/categories"
                      render={props => <CategoriesList {...props} />}
                    />
                  </Switch>
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