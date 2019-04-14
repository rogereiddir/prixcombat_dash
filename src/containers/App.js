import React, { Component } from 'react';
import '../App.css';
import Main from '../containers/main'
import { configureStore } from "../store"
import { Switch, Route, BrowserRouter as Router  } from "react-router-dom";
import { Provider } from "react-redux";
import ProductsList from '../components/productslist';


const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <ProductsList {...props} />}
              />
            </Switch>
          </Router>
         </Main>
       </Provider>
    );
  }
}

export default App;
