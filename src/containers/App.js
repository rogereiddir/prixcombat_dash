import React, { Component } from 'react';
import '../App.css';
import Main from '../containers/main'
import { configureStore } from "../store"
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main/>
        </Router>
       </Provider>
    );
  }
}

export default App;
