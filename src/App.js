// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Store from './pages/Stores';
import Home from './pages/Home';
import User from './pages/Users';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Left Navigation */}
        <div style={{ width: '250px' }}>
          <Navigation />
        </div>

        {/* Right Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
