import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../../Layout/Header/Header';
import Routes from '../../Config/routes';
import setAuthHeader from '../../utils/setAuthHeader';
function App() {
  // boolean true or false
  // const [loggedIn, login] = useState(false);
  const [loggedIn, login] = useState(window.localStorage.getItem('jwtToken') ? true : false);

  // object {username, id}
  const [user, setUser] = useState(null);


  useEffect(() => {
    const item = window.localStorage.getItem('jwtToken');
    if (item) setAuthHeader(item);
  }, [])
  const logout = () => {
    // delete the token from localStorage
    localStorage.removeItem('jwtToken');
    // remove the header from being sent in requests
    // passing it no value will make its logic falsy, which will remove the header
    setAuthHeader();
    // remove the user info from state so the re-render will log them out and change the HTML header automatically
    // this.setState({
    //   user: '',
    //   id: ''
    // })
    login(false);
    setUser(null);
  }
  return (
    <div className="App">
      <Header loggedIn={loggedIn} logout={logout} />
      <Routes loggedIn={loggedIn} setUser={setUser} login={login}/>
    </div>
  );
}

export default App;
