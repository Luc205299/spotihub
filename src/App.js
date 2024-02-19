import React from 'react';
import { Link } from 'react-router-dom'; // Importez Link
import './App.css'; 
import logo from './logo.png';

function App() {
  return (
    <div className="container">
      <div id="logo">
        Spotyhub
        <img src={logo} alt="Logo" className="logo" width="200" height="200" />
      </div>
      <h1 className="title">Discover a new way to listen to music with friends!</h1>
      
      <Link to="/newpage" className="button">Try it</Link>
    </div>
  );
}

export default App;
