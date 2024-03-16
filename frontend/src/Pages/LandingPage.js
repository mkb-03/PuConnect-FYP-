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
                  <h4 className="brownColor pt-5 mt-2">Strong Comunity</h4>
                  <p
                    className="pt-1"
                    style={{ fontWeight: "500", fontSize: "1rem" }}
                  >
                    Join an interactive group of talented and creative minds.
                  </p>
                </div>
                <div>
                  <h4 className="brownColor pt-3">Innovative Tools</h4>
                  <p
                    className="pt-1"
                    style={{ fontWeight: "500", fontSize: "1rem" }}
                  >
                    Harness the power of our premium collaborative resources.
                  </p>
                </div>
                <div>
                  <h4 className="brownColor pt-3">Career Opportunities</h4>
                  <p
                    className="pt-1"
                    style={{ fontWeight: "500", fontSize: "1rem" }}
                  >
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
        <div className="container mt-3 mb-3 pt-5 pb-5 ">
          <div className="container  ">
            <div className="row pt-5  ">
              <div className="col ">
                <div className="headings ps-3">Get to Know Us</div>
                <div className=" pt-4 ps-5 ms-5">
                <button className="brownButton " type="button">
                  About Us
                </button>
              </div>
              </div>
              <div className="col pe-5">
                <div>
                  <p
                    className="pt-1  "
                    style={{ fontWeight: "600", fontSize: "1.05rem" }}
                  >
                    We're not just a portal, we're the launchpad for your next
                    big discovery. Connect with classmates, participate in
                    stimulating discussions, find study groups, and even career
                    opportunities. With PuConnect, it’s more than an education,
                    it’s an experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container  mt-5 pt-5 pb-5 ps-3 ">
          <div className="row">
            <div className="col-6 ">
              <div className="headings brownColor pt-3 ps-3">
                Jobs & Success Stories{" "}
              </div>
              <p
                className=" ps-3 pt-5"
                style={{ fontWeight: "600", fontSize: "1.05rem" }}
              >
                Find and apply to job opportunities posted by employers and
                alumni. Get inspired by real success stories of PuConnect
                members.
              </p>

              <div className="row align-items-center mt-2 ps-5 pt-4">
                <h4 className="col brownColor">600+</h4>
                <h4 className="col brownColor">300+</h4>
                <h4 className="col brownColor">1000+</h4>
              </div>
              <div className="row align-items-center ps-3 pt-4">
                <p
                  className="col "
                  style={{ fontWeight: "600", fontSize: "1.05rem" }}
                >
                  Job Opportunities
                </p>
                <p
                  className="col"
                  style={{ fontWeight: "600", fontSize: "1.05rem" }}
                >
                  Success Stories
                </p>
                <p
                  className="col"
                  style={{ fontWeight: "600", fontSize: "1.05rem" }}
                >
                  Companies
                </p>
              </div>

              <div className="text-center pt-4 pe-5 me-1">
                <button className="blackButton " type="button">
                  Find Jobs 
                </button>
              </div>
            </div>

            <div className="pt-2 col-6 text-center">
              <img
                className="jobPic "
                src={process.env.PUBLIC_URL + "/images/job.jpg"}
                alt="whyPic"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mt-5 pt-5 pb-5 text-center">
          <div className="headings brownColor ps-3">Join Today!</div>
          <div>
            <p
              className="pt-2  "
              style={{ fontWeight: "600", fontSize: "1.05rem" }}
            >
              Ready to supercharge your student life? Just hit that button and
              let’s get started!
            </p>
          </div>
          <div className="pt-2">
            <button className="brownButton me-1" type="button">
              SignUp
            </button>

            <button className="blackButton ms-1" type="button">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
