import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <section>
        <div className="background">
          <div className="container">
            <div className="row pt-5">
              <div className="col-md-6 ps-3 pt-5 ms-5">
                <span className="welComeLine">Welcome to PuConnect</span>
              </div>
              <div className="col-md-6 ps-3 pt-4 ms-5">
                <h1 className="tagLine">Your Networking Gateway</h1>
              </div>
              <div className="col-md-6 ps-4 pt-4 ms-5">
                <Link to="/signup" className="pointerCursor">
                  <span className="getStartedButton ">Get Started</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container pt-5 pb-5 ">
          <div className="headings brownColor">Why PuConnect?</div>
          <div class="container  ">
            <div class="row pt-5  ">
              <div class="col">
                <img src="" alt="whyPic"/>
              </div>
              <div class="col">
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
