import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../Redux Toolkit/authSlice';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hiddenPaths = ['/signup', '/login'];
  const isNavbarHidden = hiddenPaths.includes(location.pathname);

    // Access authentication state from Redux store
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // Access user information if needed
    const user = useSelector((state) => state.auth.user);
  
    // Dispatch the logout action
    const dispatch = useDispatch();
  
    const handleLogout = () => {
      // Dispatch the logout action
      dispatch(logout());
  
      // Redirect or perform additional logout actions if needed
      navigate('/login');
    };

  if (isNavbarHidden) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbarBackground">
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
          <span className="navbar-toggler-icon menuIcon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link navbarText activeLink" to="/home">
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
          {isAuthenticated ? (
            <>
              {/* Render message button and logout link for authenticated users */}
              <Link to="/messages" className="me-2">
                <button className="greyButton" type="button">
                  Messages
                </button>
              </Link>
              <button className="greyButton" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Render signup and login buttons for non-authenticated users */}
              <Link to="/signup" className="me-2">
                <button className="greyButton" type="button">
                  SignUp
                </button>
              </Link>
              <Link to="/login">
                <button className="greyButton" type="button">
                  LogIn
                </button>
              </Link>
            </>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
