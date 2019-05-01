import React, { Component } from 'react'
import {Layout, Menu, Icon} from 'antd';
import { Link } from "react-router-dom";
const { Sider } = Layout;



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
              defaultSelectedKeys={[this.props.path]}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
            <Menu.Item key="dashboard">
             <Link to="/dashboard">
                <Icon type="windows" />
                 <span>Dashboard</span>
                </Link>
             </Menu.Item>
            <Menu.Item key="users">
             <Link to="/users">
                <Icon type="user" />
                <span>Users</span>
                </Link>
             </Menu.Item>
             <Menu.Item key="products">
             <Link to="/products">
                <Icon type="shopping-cart" />
                <span>Products</span>
              </Link>
             </Menu.Item>
             <Menu.Item key="categories">
               <Link to="/categories">
                <Icon type="cluster" />
                <span>Categories</span>
               </Link>
             </Menu.Item>
             <Menu.Item key="shops">
             <Link to="/shops">
                <Icon type="shop" />
                <span>Shops</span>
                </Link>
             </Menu.Item>
             <Menu.Item key="brands">
             <Link to="/brands">
                <Icon type="star" />
                <span>Brands</span>
                </Link>
             </Menu.Item>
            </Menu>
        </Sider>
    )
  }
}
