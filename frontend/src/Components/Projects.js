import React, { useState } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import Modal from "./Modals/Modal";
const Projects = () => {

  const [isAddProjectModalOpen, setAddProjectModalOpen ] = useState(false);
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")

  return (
    <div className="container">
      <div className="row">
        <div className="col col-9">
          <div className="card mb-3">
            <div className="card-body ">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Projects</h5>
                <div className="d-flex">
                  <FaPlus
                    className="me-2"
                    size={22}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      padding: "4px",
                    }}
                    // onClick={handlePlusClick}
                  />
                  <FaPen
                    size={22}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      padding: "4px",
                    }}
                    // onClick={handlePenClick}
                  />
                </div>
              </div>

              <p className="card-text mt-4">Add projects</p>

            </div>
            <div>
            </div>
          </div>
        </div>
        <div className="col col-3"></div>
      </div>
    </div>
  );
};

export default Projects;
