import React, { useState } from 'react';
import './App.css';
import Header from '../../Layout/Header/Header';
import Routes from '../../Config/routes';
function App() {
  const [loggedIn, login] = useState(true);
  return (
    <div className="App">
      <Header loggedIn={loggedIn} />
      <Routes loggedIn={loggedIn} login={login}/>
    </div>
  );
}

export default App;
