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
      <div>
        {/* Left Navigation */}
        <div>
          <Navigation />
        </div>

        {/* Right Content */}
        <div>
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
