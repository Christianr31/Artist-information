import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ArtistDetail from './ArtistDetail';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artist/:id" element={<ArtistDetail />} />
    </Routes>
  </Router>
);

export default App;
