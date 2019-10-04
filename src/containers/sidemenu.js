import React, { Component } from 'react'
import {Layout, Menu, Icon , message } from 'antd';
import { Link , withRouter} from "react-router-dom";
import { connect } from "react-redux";
import  { userLogout , setCurrentUser } from "../store/actions/users";

const { Sider } = Layout;



class sidemenu extends Component {
    state = {
        collapsed: false,
    };
        
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    logout = () => {
     let {dispatch , role } = this.props
      if(role === 'admin'){
        dispatch(userLogout({data:{userId:localStorage.getItem("uuid")}}))
        .then((res)=>{
        localStorage.clear();
        dispatch(setCurrentUser({}));
        this.props.history.push('/');
        message.success(res.message)
        localStorage.clear()
        })
      }else{
        dispatch(userLogout({data:{userId:localStorage.getItem("uuid")}}))
        .then((res)=>{
        localStorage.clear();
        dispatch(setCurrentUser({}));
        this.props.history.push('/');
        message.success(res.message)
        localStorage.clear()

        })
      }
    
    }
    
  render() {
    let { role } = this.props;
    let path = this.props.location.pathname.split('/')[1];
    let links = [
      {
        link :"products",
        role:"shop"
      },
      {
        link :"users",
        role:"admin"
      },
      {
        link :"subcategories",
        role:"admin"
      },
      {
        link :"categories",
        role:"admin"
      },
      {
        link :"shops",
        role:"admin"
      },
      {
        link :"brands",
        role:"admin"
      }
    ]
    let renderLink = (links) => {
      return links.map((link,index) => {
        if(role === link.role){
          return (
            <Menu.Item key={link.link}>
              <Link to={`/${link.link}`}>
                <Icon type="shopping-cart" />
                <span>{link.link}</span>
              </Link> 
            </Menu.Item> 
          )
       }else{}
       return <div key={index} />
     }) 
    }
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
            {renderLink(links)}
             <Menu.Item onClick={this.logout} key="logout">
                <Icon type="logout" />
                <span>Log Out</span>
             </Menu.Item>
            </Menu>
        </Sider>
    )
  }
}

function mapStateToProps(state) {
  return {
    role:state.userAuth.user.role,
  };
}
export default withRouter(
  connect(mapStateToProps)(sidemenu)
 );
