import React, { useState, useEffect } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import Modal from "./Modals/Modal";
import axios from "axios";
import { useSelector } from "react-redux";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    projectName: "",
    description: "",
    link: "",
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/project/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setProjects(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]); // Fetch projects on component mount

  const handleAddProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/project/create",
        newProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects([...projects, response.data]);
      setNewProject({
        projectName: "",
        description: "",
        link: "",
      });

      console.log("Sending Data", response.data)
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setNewProject({
      projectName: project.projectName,
      description: project.description,
      link: project.link, 
    });
    setEditModalOpen(true);
  };

  const handleUpdateProject = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/project/update/${selectedProject._id}`,
        newProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedProjects = projects.map((project) =>
        project._id === selectedProject._id ? response.data.project : project
      );

      setProjects(updatedProjects);
      setNewProject({
        projectName: "",
        description: "",
        link: "",
      });
      setEditModalOpen(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/project/delete/${selectedProject._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedProjects = projects.filter(
        (project) => project._id !== selectedProject._id
      );

      setProjects(updatedProjects);
      setEditModalOpen(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleOpenAddModal = () => {
    setNewProject({
      projectName: "",
      description: "",
      link: "",
    });
    setAddModalOpen(true);
  };

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setSelectedProject(null);
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
                    onClick={handleOpenAddModal}
                  />
                  <FaPen
                    size={22}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      padding: "4px",
                    }}
                    onClick={handleOpenEditModal}
                  />
                </div>
              </div>
              {projects.length === 0 ? (
                <p className="card-text mt-4">Add projects</p>
              ) : (
                <div className="mt-4">
                  {projects.map((project) => (
                    <div key={project._id}>
                      <h6 className="mt-3">{project.projectName}</h6>
                      <p>{project.description}</p>
                      <a className="projectLink" href={project.link} target="_blank" rel="noreferrer">Show Project</a>
                      {/* Add more details as needed */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col col-3"></div>
      </div>

      {/* Add Project Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        title="Add Project"
        content={
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="projectName"
                placeholder="Project Name"
                value={newProject.projectName}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    projectName: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <textarea
                placeholder="Description"
                className="form-control"
                id="description"
                rows="3"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="link"
                placeholder="Add link"
                value={newProject.link}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    link: e.target.value,
                  })
                }
              />
            </div>
          </form>
        }
        actions={
          <button className="btn btn-secondary" onClick={handleAddProject}>
            Save
          </button>
        }
      />

      {/* Edit Project Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        title="Edit Project"
        content={
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="projectName"
                placeholder="Project Name"
                value={newProject.projectName}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    projectName: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <textarea
                placeholder="Description"
                className="form-control"
                id="description"
                rows="3"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="link"
                placeholder="Add link"
                value={newProject.link}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    link: e.target.value,
                  })
                }
              />
            </div>
          </form>
        }
        actions={
          <div>
            <button
              className="btn btn-danger me-2"
              onClick={handleDeleteProject}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleUpdateProject}
            >
              Update
            </button>
          </div>
        }
      />
    </div>
  );
};

export default Projects;
