import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {

  const location = useLocation();

  // List of paths where the navbar should be hidden
  const hiddenPaths = ['/signup', '/login'];

  // Check if the current path is in the hiddenPaths list
  const isNavbarHidden = hiddenPaths.includes(location.pathname);

  // Render the navbar only if it's not hidden
  if (isNavbarHidden) {
    return null;
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbarBackground">
        <div className="container-fluid ">
          <NavLink className="navbar-brand navbarTitle activeLink" to="/">
            PuConnect
          </NavLink>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link navbarText activeLink" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link navbarText activeLink" to="/contact">
                  Contact Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link navbarText activeLink" to="/about">
                  About Us
                </NavLink>
              </li>
            </ul>
            <div className="d-flex">
              <NavLink to="/signup" >

                <button className="greyButton me-2" type="submit">
                  SignUp
                </button>
              </NavLink>
              
              <NavLink to="/login" >
                <button className="greyButton me-2" type="submit">
                  LogIn
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
