import React, { Component } from 'react'
import {Layout, Menu, Icon , message} from 'antd';
import { Link , withRouter} from "react-router-dom";
import { connect } from "react-redux";
import  { userLogout , setCurrentUser , setAuthorizationToken} from "../store/actions/users";

const { Sider } = Layout;



class sidemenu extends Component {
    state = {
        collapsed: false,
    };
        
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    logout = () => {
     let {dispatch} = this.props
     dispatch(userLogout())
     .then((res)=>{
      localStorage.clear();
      setAuthorizationToken(false);
      dispatch(setCurrentUser({}));
      this.props.history.push('/');
      message.success(res.message)
    })
    
    }
    
  render() {
    let { match } = this.props;
    console.log(match)
    let path = this.props.location.pathname.split('/')[1];
    return (
     <Sider 
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        width={200} style={{ background: '#fff' }}>
         <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[path]}
              style={{ height: '100%', borderRight: 0 }}
            >
            <Menu.Item key="dashboard">
              <Link to={`/dashboard`}>
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
             <Link to={`/products`}>
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
             <Menu.Item onClick={this.logout} key="logout">
                <Icon type="logout" />
                <span>Log Out</span>
             </Menu.Item>
            </Menu>
        </Sider>
    )
  }
}

export default withRouter(
  connect()(sidemenu)
 );
