import React from 'react'
import { Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbarBackground">
        <div className="container-fluid ">
          <Link className="navbar-brand navbarTitle " to="#">PuConnect</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link navbarText" aria-current="page" to="#">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navbarText" to="#">Contact Us</Link>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" to="#">Action</a></li>
                  <li><a className="dropdown-item" to="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" to="#">Something else here</a></li>
                </ul>
              </li> */}
               <li className="nav-item">
                <Link className="nav-link navbarText" to="#">About Us</Link>
              </li>
            </ul>
            <div className="d-flex" >
                <button className=" skinButton me-2" type="submit">SignUp</button>              
                <button className="skinButton me-2" type="submit">LogIn</button>
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar