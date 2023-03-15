import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <div className="App">
      <Navbar expand="sm" fixed="top">
        <Container>
          <Navbar.Brand>(WebsiteName)</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-start">
              <Nav.Link>
                <i className="fas fa-home"></i> Home
              </Nav.Link>
              <Nav.Link>
                <i className="fas fa-sign-in-alt"></i> Sign In
              </Nav.Link>
              <Nav.Link>
                <i className="fas fa-user-plus"></i> Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
