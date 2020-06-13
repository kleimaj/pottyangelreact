import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import UserApi from '../../api/UserApi';
import setAuthHeader from '../../utils/setAuthHeader';

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

            props.setUser({user: decoded.username, id:decoded._id});
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
                    props.login({user: decoded.username, id:decoded._id});
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
        <div>
            <form>
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} required/>
                {!passwordValid ? 
                <p className="error-message">Password not strong enough</p> : null}
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required/>
                <button onClick={handleSignup}>Sign Up</button>
                <button onClick={handleLogin}>Log In</button>
            </form>
        </div>
    );
}

export default Onboarding;