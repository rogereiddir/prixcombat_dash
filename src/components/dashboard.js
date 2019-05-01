import React, { Component } from 'react'

export default class dashboard extends Component {
  componentWillUnmount(){
    console.log('ok')
  }
  render() {
    return (
      <div>
        Dashboard
      </div>
    )
  }
}
