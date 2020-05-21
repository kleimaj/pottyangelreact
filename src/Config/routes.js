import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Components/Home/Home.js';

const Routes = (props) => {
    return (
        <Switch>
          <Route exact path='/' render={() => 
          <Home loggedIn={props.loggedIn} login={props.login} />}/> />
        </Switch>
      );
    }
    
export default Routes;
    