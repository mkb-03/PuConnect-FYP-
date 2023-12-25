import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const hiddenPaths = ['/signup', '/login'];
  const isNavbarHidden = hiddenPaths.includes(location.pathname);

  if (isNavbarHidden) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbarBackground">
      <div className="container-fluid">
        <Link className="navbar-brand navbarTitle activeLink" to="/">
          PuConnect
        </Link>
        <button
          className="navbar-toggler"
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
              <Link className="nav-link navbarText activeLink" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbarText activeLink" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbarText activeLink" to="/about">
                About Us
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link to="/signup">
              <button className="greyButton me-2" type="submit">
                SignUp
              </button>
            </Link>
            <Link to="/login">
              <button className="greyButton me-2" type="submit">
                LogIn
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
