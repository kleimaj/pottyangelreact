import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import UserApi from '../../api/UserApi';
import setAuthHeader from '../../utils/setAuthHeader';
import './Onboarding.css'
import TextLoop from "react-text-loop";
import Lottie from 'react-lottie';
import * as animationData from './logoanimation2.json'

const Onboarding = (props) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordValid, setValid] = useState(true);
    const [usernameError, setError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    // const [fadeIn, setFadeIn] = useState(0);
    // const [fadeOut, setFadeOut] = useState(0);

    // useEffect(() => {
    //   setTimeout(() => {
    //     setFadeOut(1);
    //     setTimeout(() => {
    //       setFadeIn(1);
    //     }, 1000);
    //   }, 1000);
    // }, [])

    // const transitionText = () => {
    //   setTimeout(() => {
    //     return <span>Any</span>
    //   }, 1500)
    //   return <span>High</span>
    // }

    const checkPasswordStrength = password => {
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})")
        return (strongRegex.test(password)) && (password.length >= 8) ? true : false
    }

    const handleSignup = (e) => {
        e.preventDefault();
        if (!username) {
          return
        }
        if (!checkPasswordStrength(password)) {
            setValid(false);
            return
        }
        setValid(true)
        setLoginError(false);
        register({username: username,
                  password: password}
                );
    }
    const handleLogin = (e) => {
      e.preventDefault();
      if (username && password) {        
        setValid(true)
        setLoginError(false)
        setError(false)
        login({username: username,
               password: password}
            );
      }
      else {
        setValid(false);
      }
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
      setLoginError(false)
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
        .catch(err => {
          console.log(err)
          setLoginError(true);
        });
      }
      const register = (user) => {
        UserApi.register(user)
          .then(res => {
              console.log(res);
            if (res.status === 201) {
                UserApi.login(user)
                .then(res => {
                    // get the token from the response
                    // console.log(res);
                    const token = res.data.token;
                    // console.log(token)
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
                .catch(err => {
                  console.log(err)
                  setLoginError(true)
                })
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
          .catch(err => 
            {
              console.log(err)
              setError(true);
            });
      }

    return (
        <div className="landing-page">
          <h1>Potty Angel</h1>
          {/* <img id="logo" src="/images/pottylogods.svg" /> */}
          <div id="logo-animation">
          <Lottie options={defaultOptions}
              height={300}
              width={300}
              // isStopped={this.state.isStopped}
              // isPaused={this.state.isPaused}
              />
              </div>
          {/* {fadeIn ? 
            (<h3 className="fade">Any Quality Bathrooms Near You</h3>):
              (fadeOut ? 
                <h3 className="fadeout">Hello!</h3> : 
                <h3>Hello!</h3>) } */}
                {/* <h3>{fadeIn ? 
            (<span className="fade">Any</span>):
              (fadeOut ? 
                <span className="fadeout">High</span> : 
                <span>High</span>) } Quality Bathrooms Near You</h3> */}
                <h3>
                  <TextLoop>
                    <span>High&nbsp;</span>
                    <span>Any&nbsp;</span>
                    <span>Many&nbsp;</span>
                  </TextLoop>
                    Quality Bathrooms Near You
                </h3>
            <form onSubmit={handleLogin}>
                {usernameError ? 
                <p className="error-message">Username already taken</p> :
                null}
                {loginError ? 
                <p className="error-message">Username or Password Incorrect</p> :
                null}
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