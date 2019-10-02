import React, { Component } from 'react';
import jwtDecode from "jwt-decode";
import Cookies from 'universal-cookie';
import { message } from 'antd';
import { Switch , Route , BrowserRouter as Router  } from "react-router-dom";
import { Provider } from "react-redux";
import Login from '../components/login';
import ProtectedRoute from '../hocs/withAuth'
import AdminProtectedRoute from '../hocs/withAuthAdmin'
import ProductsList from '../components/productslist';
import CategoriesList from '../components/categorylist';
import SubCategoriesList from '../components/subcategorylist';
import ShopsList from '../components/shops.list';
import UsersList from '../components/users.list';
import BrandsList from '../components/brands.list';
import Dashboard from '../components/dashboard';
import {  setCurrentUser , userLogout } from "../store/actions/users";
import { configureStore } from "../store"
import '../App.css';


const cookies = new Cookies();
const store = configureStore();

if (cookies.get('access')) {

  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(cookies.get('access'))));
  } catch (e) {
    store.dispatch(userLogout({data:{userId:localStorage.getItem("uuid")}}))
    .then((res)=>{
      store.dispatch(setCurrentUser({}));
      message.success(res.message)
    })
  }
}else{
 if(localStorage.getItem("uuid")){
  store.dispatch(userLogout({data:{userId:localStorage.getItem("uuid")}}))
  .then((res)=>{
    store.dispatch(setCurrentUser({}));
    message.success(res.message)
    localStorage.clear()
  })
 }
}

class App extends Component {
  render() {
   
    return (
      <Provider store={store}>
        <Router>
          <Switch> 
            <Route exact path="/" component={Login}/>
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/products" component={ProductsList}/>
            <AdminProtectedRoute exact path="/categories" component={CategoriesList}/>
            <AdminProtectedRoute exact path="/subcategories" component={SubCategoriesList}/>
            <AdminProtectedRoute exact path="/users" component={UsersList}/>
            <AdminProtectedRoute exact path="/brands" component={BrandsList}/>
            <AdminProtectedRoute exact path="/shops" component={ShopsList}/>
          </Switch>
        </Router>
       </Provider>
    );
  }
}

export default App;
