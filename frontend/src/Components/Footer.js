import React from "react";

const Footer = () => {
  return (
    <footer className="navbarBackground mt-5 text-white pt-5 pb-5">
      <div className="container activeLink">
        <div className="row">
          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="fw-bold ">Quick Links</h5>
            <ul className="list-unstyled pt-3 ">
              <li className="pt-2 ">
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
          <div className="col-md-3">
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
          <div className="col-md-3">
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
      </div>
    </footer>
  );
};

export default Footer;
