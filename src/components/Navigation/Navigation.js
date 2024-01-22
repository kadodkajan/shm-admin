// Navigation.js
import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar ,Container} from 'react-bootstrap';

function Navigation() {
  const customNavbarStyle = {
    backgroundColor: "#739072", // Replace with your desired color code
  };

  return (
    <Container style={customNavbarStyle}>
    <Navbar style={customNavbarStyle} expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/store">Stores</Nav.Link>
          <Nav.Link as={Link} to="/user">Users</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </Container>
  );
}

export default Navigation;
