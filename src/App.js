import React, { useEffect, Suspense } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Async from './hoc/Async/Async';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const MyOrders = React.lazy(() => {
  return import('./containers/MyOrders/MyOrders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {

  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  let routes = (
    <Switch>
    <Route  path="/auth" render={(props) => <Auth {...props}/>}/>
    <Route  path="/" exact component={BurgerBuilder}/>
    <Redirect to="/" />
    </Switch>
  );
  
  if(props.isAuthenticated){
    routes = (
      <Switch>
      <Route  path="/auth" render={(props) => <Auth {...props} />}/>  
      <Route  path="/checkout" render={(props) => <Checkout {...props} />}/>
      <Route  path="/orders" render={(props) => <MyOrders {...props} />}/>
      <Route  path="/logout" component={Logout}/>
      <Route  path="/" exact component={BurgerBuilder}/>
      </Switch>

    );
  }

  return (
    <div>
      <Layout>
      <Suspense fallback={<p>Loading...</p>}> 
      {routes}
      </Suspense>      
      </Layout>
    </div>
  );
 };


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
