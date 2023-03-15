import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="App">
      <Navbar className={styles.NavBar} expand="sm" fixed="top">
        <Container>
          <NavLink to="/">
            <Navbar.Brand className={styles.HeaderFont}>Website</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-start">
              <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/"
                exact
              >
                <i className="fas fa-home"></i> Home
              </NavLink>
              <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signin"
              >
                <i className="fas fa-sign-in-alt"></i> Sign In
              </NavLink>
              <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signup"
              >
                <i className="fas fa-user-plus"></i> Sign Up
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
