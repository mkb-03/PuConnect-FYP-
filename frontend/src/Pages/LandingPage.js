import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section>
        <div className='background'>
          <div className="container">
            <div className="row pt-5">
              <div className="col-md-6 ps-3 pt-5 ms-5">
                <span className="welComeLine">Welcome to PuConnect</span>
              </div>
              <div className="col-md-6 ps-3 pt-4 ms-5">
                <span className="tagLine">Your Networking Gateway</span>
              </div>
              <div className="col-md-6 ps-4 pt-4 ms-5">
                <Link  to="/signup" className='pointerCursor'>

                  <span className="getStartedButton ">Get Started</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Home