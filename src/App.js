import React, { Component } from 'react';
import './App.css';
import Main from './components/main'
import ProductsList from './components/productslist'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Main >
           <ProductsList/>
        </Main>
      </div>
    );
  }
}

export default App;
