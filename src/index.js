import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Newpage from './Newpage'; // Importez le composant NewPage

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" component={App} />
      <Route path="/newpage" component={Newpage} /> {/* Route pour la nouvelle page */}
    </Routes>
  </Router>,
  document.getElementById('root')
);