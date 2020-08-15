import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Components/Home/Home.js';
import Onboarding from '../Components/Onboarding/Onboarding';
import PottyDetails from '../Components/PottyDetails/PottyDetails';

const Routes = (props) => {
    return (
        <Switch>
          
          <Route path='/signup' render={() => 
          (props.loggedIn ? 
            (<Redirect to='/' />):
            (<Onboarding setUser={props.setUser} login={props.login}/>)
            )} />

          <Route path='/potty/:id' render={() => 
          <PottyDetails loggedIn={props.loggedIn} user={props.user}/>} />

          <Route exact path='/' render={() => 
          <Home loggedIn={props.loggedIn} login={props.login} />}/>
        </Switch>
      );
    }
    
export default Routes;
    