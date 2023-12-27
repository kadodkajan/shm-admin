// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Store from './pages/Stores';
import Home from './pages/Home';
import User from './pages/Users';
import "./App.css"

function App() {
  
  return (
    <Router>
         

      <div style={{ display: 'flex' ,backgroundColor:'#4F6F52' , minHeight: '100vh'}}>
        {/* Left Navigation */}
        <div style={{ flex: '0 0 250px', paddingLeft: '10px',paddingTop: '10px',borderRadius: '10px' , minHeight: '96vh'}}>
          <Navigation />
        </div>

        {/* Right Content */}
        <div style={{ flex: 1, paddingLeft: '20px', paddingTop: '10px',paddingRight: '10px',minHeight: '96vh' ,paddingBottom: '10px'}}>
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
