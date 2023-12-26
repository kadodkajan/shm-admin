// Navigation.js
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="card "style={{ backgroundColor:'#739072', width:'250px',minHeight: '96vh' ,position: 'fixed'}}>
      <div className="card-body" >
        <ul className="nav flex-column align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <button className="btn btn-outline-secondary btn-lg">Home</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/store">
              <button className="btn btn-outline-secondary btn-lg btn-block">Stores</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user">
              <button className="btn btn-outline-secondary btn-lg btn-block">Users</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
