import React from 'react';
import './App.css'; 
import logo from './logo.png';


function App() {
  const pageAuth = () => {
    window.location.href = "redirect.html";
  };

  return (
    <div className="container">
      <div id="logo">
        Spotyhub
        <img src={logo} alt="Logo" className="logo" width="200" height="200" />
      </div>
      <h1 className="title">Discover a new way to listen to music with friends!</h1>
      <button className="button" onClick={pageAuth}>Try it</button>
    </div>
  );
}

export default App;
