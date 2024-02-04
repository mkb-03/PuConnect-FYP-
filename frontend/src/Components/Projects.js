import React, { useState, useEffect } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import Modal from "./Modals/Modal";
import axios from "axios"; // Import Axios for making API requests
import { useSelector } from "react-redux";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: "",
    description: "",
    links: [],
  });
  const token = useSelector((state) => state.auth.token)

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/project/all", {
        headers: {
          Authorization : `Bearer ${token}`
        }
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []); // Fetch projects on component mount

  const handleAddProject = async () => {
    try {
      const response = await axios.post("http://localhost:3000/project/create", newProject);
      setProjects([...projects, response.data]);
      setNewProject({
        projectName: "",
        description: "",
        links: [],
      });
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleOpenModal = () => {
    console.log("modal opened");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-9">
          <div className="card mb-3">
            <div className="card-body">
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
                    onClick={handleOpenModal}
                  />
                  <FaPen
                    size={22}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      padding: "4px",
                    }}
                  />
                </div>
              </div>
              
              <p className="card-text mt-4">Add projects</p>
            </div>
            {/* Display existing projects */}
            <div>
              {projects.map((project) => (
                <div key={project._id}>
                  <h6>{project.projectName}</h6>
                  <p>{project.description}</p>
                  {/* Add more details as needed */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col col-3"></div>
      </div>

      {/* Add Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add Project"
        content={
          <form>
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                value={newProject.projectName}
                onChange={(e) =>
                  setNewProject({ ...newProject, projectName: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
              ></textarea>
            </div>
            {/* Add more form fields as needed */}
          </form>
        }
        actions={
          <button className="btn btn-primary" onClick={handleAddProject}>
            Add Project
          </button>
        }
      />
    </div>
  );
};

export default Projects;
