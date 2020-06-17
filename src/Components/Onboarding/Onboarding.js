import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import UserApi from '../../api/UserApi';
import setAuthHeader from '../../utils/setAuthHeader';
import './Onboarding.css'
import Lottie from 'react-lottie';
import * as animationData from './logoanimation2.json'

const Onboarding = (props) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordValid, setValid] = useState(true);

    const checkPasswordStrength = password => {
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})")
        return (strongRegex.test(password)) && (password.length >= 8) ? true : false
    }

    const handleSignup = (e) => {
        e.preventDefault();
        if (!checkPasswordStrength(password)) {
            setValid(false);
        }
        register({username: username,
                  password: password}
                );
    }
    const handleLogin = (e) => {
        e.preventDefault();
        login({username: username,
               password: password}
            );
    }

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData.default,
      // rendererSettings: {
      //   preserveAspectRatio: 'xMidYMid slice'
      // }
    };

    const login = (user) => {
        UserApi.login(user)
        .then(res => {
          if (res.status === 200) {
            // get the token from the response
            const token = res.data.token;
            // set the token to local storage
            localStorage.setItem('jwtToken', token);
            // set the auth header to the token
            setAuthHeader(token);
            // decode the token
            const decoded = jwt_decode(token);
            // set the state to the decoded user information
            props.login(true);

            props.setUser(decoded.username);
            // this.setState({
            //   user: decoded.username,
            //   id: decoded._id
            // })
          }
        })
        .catch(err => console.log(err));
      }
      const register = (user) => {
        UserApi.register(user)
          .then(res => {
              console.log(res);
            if (res.status === 201) {
                UserApi.login(user)
                .then(res => {
                    // get the token from the response
                    console.log(res);
                    const token = res.data.token;
                    console.log(token)
                    // set the token to local storage
                    localStorage.setItem('jwtToken', token);
                    // set the auth header to the token
                    setAuthHeader(token);
                    // decode the token
                    const decoded = jwt_decode(token);
                    // set the state to the decoded user information
                    props.login(true);
                    props.setUser(decoded.username);

                })
                .catch(err => console.log(err))
            //   // get the token from the response
            //   const token = res.data.token;
            //   // set the token to local storage
            //   localStorage.setItem('jwtToken', token);
            //   // set the auth header to the token
            //   setAuthHeader(token);
            //   // decode the token
            //   const decoded = jwt_decode(token);
            //   // set the state to the decoded user information
            //   props.login({user: decoded.username, id:decoded._id});

            //   this.setState({
            //     user: decoded.username,
            //     id: decoded._id
            //   })
            }
          })
          .catch(err => console.log(err));
      }

    return (
        <div className="landing-page">
          <h1>Potty Angel</h1>
          {/* <img id="logo" src="/images/pottylogods.svg" /> */}
          <div id="logo-animation">
          <Lottie options={defaultOptions}
              height={350}
              width={350}
              // isStopped={this.state.isStopped}
              // isPaused={this.state.isPaused}
              />
              </div>
          <h3>High Quality Bathrooms Near You</h3>
            <form>
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} required/>
                {!passwordValid ? 
                <p className="error-message">Password not strong enough</p> : null}
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required/>
                <div className="button-group">
                <button onClick={handleSignup}>Sign Up</button>
                <button onClick={handleLogin}>Log In</button>
                </div>
            </form>
        </div>
    );
}

export default Onboarding;