import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Login from './Login';  // Criamos depois
import Biblioteca from './Biblioteca'; // Criamos depois

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
      </Routes>
    </Router>
  );
}

export default App;
