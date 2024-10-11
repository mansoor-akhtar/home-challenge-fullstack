import React, { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { navbarBrand, navs, withRouter } from "../../../utils";
import logoImage from "../../../assets/images/logo.png";
import { connect } from "react-redux";
import { logoutUser } from "../../../store/action";
import './Navbar.css';

const NavBar = (props) => {
  const navRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleNavClick = () => {
    setIsCollapsed(true);
  };

  return (
    <>
      <Navbar
        ref={navRef}
        className="navbar"
        variant="dark"
        expand="lg"
        fixed="top"
        expanded={!isCollapsed}
      >
        <Navbar.Brand className="nav-brand" href="/">
          <img src={logoImage} alt="Logo" className="logo" />
          {navbarBrand}
        </Navbar.Brand>
        {isCollapsed && (
          <Navbar.Toggle
            className="border-0"
            aria-controls="basic-navbar-nav"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}

        {!isCollapsed && (
          <IoCloseOutline
            size={40}
            className="close-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" onClick={handleNavClick}>
            {navs.map((navItem) => (
              <LinkContainer to={navItem.page} key={uuidv4()}>
                <Nav.Link className="nav-item">{navItem.nav}</Nav.Link>
              </LinkContainer>
            ))}
            { props.auth.isAuthenticated ? (
              <>
                <LinkContainer to="/preferences" className="d-block d-lg-none">
                  <Nav.Link className="nav-item">Preference</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/#" className="d-block d-lg-none" onClick={props.logoutUser}>
                  <Nav.Link className="nav-item">Logout</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/login" className="d-block d-lg-none">
                  <Nav.Link className="nav-item">Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register" className="d-block d-lg-none">
                  <Nav.Link className="nav-item">Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
            {props.auth.isAuthenticated ? (
              <>
                <Nav className="justify-content-end right-side-navbar">
                  <Dropdown className="user-profile-dropdown d-none d-lg-block">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <FaUser />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="1" href="/preferences">Preference</Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={props.logoutUser}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </>
            ) : (
              <Nav className="justify-content-end right-side-navbar d-none d-lg-flex">
                <LinkContainer to="/login">
                  <Nav.Link className="nav-item">Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="nav-item">Register</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
      </Navbar>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar));
