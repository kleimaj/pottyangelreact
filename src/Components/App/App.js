import React, { useState } from 'react';
import './App.css';
import Header from '../../Layout/Header/Header';
import Routes from '../../Config/routes';
function App() {
  const [loggedIn, login] = useState(false);
  return (
    <div className="App">
      <Header />
      <Routes loggedIn={loggedIn} login={login}/>
    </div>
  );
}

export default App;
