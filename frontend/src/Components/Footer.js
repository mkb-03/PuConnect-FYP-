import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
const Footer = () => {

  const location = useLocation();
  const hiddenPaths = ['/signup', '/login'];
  const isFooterHidden = hiddenPaths.includes(location.pathname);

  if (isFooterHidden) {
    return null
  }
  
  return (
    <footer className="navbarBackground text-white pt-5 pb-5">
      <div className="container">
        <div className="row">
          {/* Quick Links */}
          <div className="col-md-3 mb-3 mb-md-0">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled pt-3">
              <li className="pt-2">
                <a className="activeLink" href="/">
                  Home
                </a>
              </li>
              <li className="pt-2">
                <a className="activeLink" href="/jobs">
                  Jobs
                </a>
              </li>
              <li className="pt-2">
                <a className="activeLink" href="/profile">
                  Profile
                </a>
              </li>
            </ul>
          </div>
          {/* Help */}
          <div className="col-md-3 mb-3 mb-md-0">
            <h5 className="fw-bold">Help</h5>
            <ul className="list-unstyled pt-3">
              <li className="pt-2">
                <a className="activeLink" href="#">
                  Frequently Asked Questions
                </a>
              </li>
              <li className="pt-2">
                <a className="activeLink" href="#">
                  Contact Us
                </a>
              </li>
              <li className="pt-2">
                <a className="activeLink" href="#">
                  Support
                </a>
              </li>
            </ul>
          </div>
          {/* Learn */}
          <div className="col-md-3 mb-3 mb-md-0">
            <h5 className="fw-bold">Learn</h5>
            <ul className="list-unstyled pt-3">
              <li className="pt-2">
                <a className="activeLink" href="#">
                  About Us
                </a>
              </li>
              <li className="pt-2">
                <a className="activeLink" href="#">
                  How it Works
                </a>
              </li>
              <li className="pt-2">
                <a className="activeLink" href="#">
                  Teams
                </a>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div className="col-md-3">
            <h5 className="fw-bold">Legal</h5>
            <ul className="list-unstyled pt-3">
              <li className="pt-2">
                <a className="activeLink" href="#">
                  Terms of Service
                </a>
              </li>
              <li className="pt-2">
                <a className="activeLink" href="#">
                  Privacy Policy
                </a>
              </li>
              <li className="pt-2">
                <a className="activeLink" href="#">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="row align-items-center">
          {/* Left corner */}
          <div className="col-md-6 pt-2 text-center text-md-start mb-3 mb-md-0">
            <p className="fw-bold">&copy; 2024 PuConnect</p>
          </div>
          {/* Right corner */}
          <div className="col-md-6 text-center text-md-end">
            <span className="fw-bold me-2 pt-1 d-none d-md-inline-block">
              Find Us:{" "}
            </span>
            <a className="activeLink me-3" href="https://facebook.com">
              <FaFacebook />
            </a>
            <a className="activeLink me-3" href="https://instagram.com">
              <FaInstagram />
            </a>
            <a className="activeLink" href="https://linkedin.com">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
