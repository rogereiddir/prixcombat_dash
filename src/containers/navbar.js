import React, { Component } from 'react'
import {Layout} from 'antd';
const { Header } = Layout;
export default class navbar extends Component {
  render() {
    return (
      <Header>
       
        <div style={{ color: '#fff' }}>  Prixcombat Dashboard </div>
     
      </Header>
    )
  }
}
