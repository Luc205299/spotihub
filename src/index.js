import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Auth from './auth'; 
import Accueil from './Accueil';
import Redirect from './Redirect';

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/auth" element={<Auth />} /> 
      <Route path='/accueil' element={<Accueil />} />
      <Route path='/redirect' element={<Redirect />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

