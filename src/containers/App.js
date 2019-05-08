import React, { Component } from 'react';
import '../App.css';
import { configureStore } from "../store"
import { Provider } from "react-redux";
import { Switch , Route , BrowserRouter as Router  } from "react-router-dom";
import Login from '../components/login';
import ProtectedRoute from '../hocs/withAuth'
import ProductsList from '../components/productslist';
import CategoriesList from '../components/categorylist';
import ShopsList from '../components/shops.list';
import UsersList from '../components/users.list';
import BrandsList from '../components/brands.list';
import Dashboard from '../components/dashboard';
import { setAuthorizationToken , setCurrentUser } from "../store/actions/users";
import jwtDecode from "jwt-decode";
const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}

class App extends Component {
  render() {
   
    return (
      <Provider store={store}>
        <Router>
          <Switch> 
            <Route exact path="/" component={Login}/>
            <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
            <ProtectedRoute exact path="/products" component={ProductsList}/>
            <ProtectedRoute exact path="/categories" component={CategoriesList}/>
            <ProtectedRoute exact path="/users" component={UsersList}/>
            <ProtectedRoute exact path="/brands" component={BrandsList}/>
            <ProtectedRoute exact path="/shops" component={ShopsList}/>
          </Switch>
        </Router>
       </Provider>
    );
  }
}

export default App;
