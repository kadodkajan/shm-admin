import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

function Navigation() {
  const customNavbarStyle = {
    backgroundColor: "#739072",
  };

  return (
    <AppBar position="static" style={customNavbarStyle}>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/store" color="inherit">
            Stores
          </Button>
          <Button component={Link} to="/user" color="inherit">
            Users
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
