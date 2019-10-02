import React from 'react'
import { Layout } from 'antd';
import NavBar from '../containers/navbar';
import SideMenu from '../containers/sidemenu';
const { Content, Footer } = Layout;
export default function play() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <NavBar/>
            <Layout>
              <SideMenu/>
              <Layout>
                <Content style={{ margin: '10px 16px' }}>
                  <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                          Hello
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
