// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav flex-column align-items-center"> {/* Use align-items-center class to center the navbar vertically */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/store">
                Store
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
