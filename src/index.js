import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Auth from './auth'; 

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/newpage" element={<Auth />} /> 
    </Routes>
  </Router>,
  document.getElementById('root')
);

