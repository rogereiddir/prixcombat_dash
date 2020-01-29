import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Layout } from 'antd';
import { connect } from "react-redux";
import NavBar from '../containers/navbar';
import SideMenu from '../containers/sidemenu';
const { Content, Footer } = Layout;

export const ProtectedRoute = ({ component: Component,isAuthenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        
        if (isAuthenticated) {
          
          return(
          <Layout style={{ minHeight: '100vh' }}>
            <NavBar/>
            <Layout>
              <SideMenu/>
              <Layout>
                <Content style={{ margin: '10px 16px' }}>
                  <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                          <Component {...props} />
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Prixcombat ©2019 Created by Abdeljalil
                </Footer>
            </Layout>
          </Layout>
         </Layout>
          )
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
};

function mapStateToProps(state) {
  return { isAuthenticated: state.userAuth.isAuthenticated };
}

export default connect(mapStateToProps)(ProtectedRoute);