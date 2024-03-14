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
          <div className="headings brownColor ps-3">Why PuConnect?</div>
          <div className="container  ">
            <div className="row pt-5  ">
              <div className="col text-center">
                <img
                  className="whyPuC "
                  src={process.env.PUBLIC_URL + "/images/whyPuConnect.jpg"}
                  alt="whyPic"
                />
              </div>
              <div className="col">
                <div>
                  <h5 className="brownColor pt-4">Strong Comunity</h5>
                  <p className="pt-1" style={{fontWeight: "500"}}>
                    Join an interactive group of talented and creative minds.
                  </p>
                </div>
                <div>
                  <h5 className="brownColor pt-3">Innovative Tools</h5>
                  <p className="pt-1" style={{fontWeight: "500"}}>
                    Harness the power of our premium collaborative resources.
                  </p>
                </div>
                <div>
                  <h5 className="brownColor pt-3">Career Opportunities</h5>
                  <p className="pt-1" style={{fontWeight: "500"}}>
                    Explore a wealth of work opportunities in leading
                    industries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container pt-5 pb-5 ">
          <div className="container  ">
            <div className="row pt-5  ">
              <div className="col ">
                <div className="headings ps-3">Get to Know Us</div>
              </div>
              <div className="col pe-5">
                <div>
                  <p className="pt-1 " style={{fontWeight: "600"}}>
                  We're not just a portal, we're the launchpad for your next big discovery. Connect with classmates, participate in stimulating discussions, find study groups, and even career opportunities. With PuConnect, it’s more than an education, it’s an experience.
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
