import React, { useState, useEffect } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import Modal from "./Modals/Modal";
import axios from "axios";
import { useSelector } from "react-redux";

const Experience = ({ isHomePage }) => {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [selectedExperienceForEdit, setSelectedExperienceForEdit] =
    useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get("http://localhost:3000/experience/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExperiences(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [token]); // Fetch experiences on component mount

  const handleAddExperience = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/experience/create",
        newExperience,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExperiences([...experiences, response.data]);
      setNewExperience({
        companyName: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      });

      console.log("Sending Data", response.data);
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };

  const handleEditExperience = (experience) => {
    setSelectedExperienceForEdit(experience);
    setNewExperience({
      companyName: experience.companyName,
      position: experience.position,
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      description: experience.description || "",
    });
    setEditModalOpen(true);
  };

  const handleUpdateExperience = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/experience/update/${selectedExperienceForEdit._id}`,
        newExperience,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedExperiences = experiences.map((experience) =>
        experience._id === selectedExperienceForEdit._id
          ? response.data.experience
          : experience
      );

      setExperiences(updatedExperiences);
      setNewExperience({
        companyName: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setEditModalOpen(false);
      setSelectedExperienceForEdit(null);
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };

  const handleDeleteExperience = async () => {
    try {
      if (!selectedExperienceForEdit) {
        console.error("No experience selected for deletion");
        return;
      }

      await axios.delete(
        `http://localhost:3000/experience/delete/${selectedExperienceForEdit._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedExperiences = experiences.filter(
        (experience) => experience._id !== selectedExperienceForEdit._id
      );

      setExperiences(updatedExperiences);
      setEditModalOpen(false);
      setSelectedExperienceForEdit(null);
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const handleOpenAddModal = () => {
    setNewExperience({
      companyName: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setAddModalOpen(true);
  };

  const handleOpenEditModal = (experience) => {
    console.log("Selected Experience for Edit:", experience);
    setSelectedExperienceForEdit(experience);
    setNewExperience({
      companyName: experience.companyName,
      position: experience.position,
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      description: experience.description || "",
    });
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setSelectedExperienceForEdit(null);
  };

  return (
    <div className="container marginTop">
      <div className={`row ${isHomePage ? 'homePageStyles' : ''}`}>
        <div className="col col-9">
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Experiences</h5>
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
                </div>
              </div>
              {experiences.length === 0 ? (
                <p className="card-text mt-4">Add experiences</p>
              ) : (
                <div className="mt-4">
                  {experiences.map((experience) => (
                    <div key={experience._id} className="mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mt-3 mb-1">
                            {experience.companyName}
                          </h6>
                          <p className="text-secondary mb-1">
                            {experience.position} |{" "}
                            {experience.startDate
                              ? new Date(experience.startDate).toLocaleString(
                                  "default",
                                  { month: "short", year: "numeric" }
                                )
                              : "N/A"}{" "}
                            -{" "}
                            {experience.endDate
                              ? new Date(experience.endDate).toLocaleString(
                                  "default",
                                  { month: "short", year: "numeric" }
                                )
                              : "Present"}
                          </p>
                        </div>
                        <FaPen
                          size={20}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "white",
                            padding: "4px",
                          }}
                          onClick={() => handleOpenEditModal(experience)}
                        />
                      </div>

                      {experience.description && (
                        <p className="mb-0">{experience.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col col-3"></div>
      </div>

      {/* Add Experience Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        title="Add Experience"
        content={
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="companyName"
                placeholder="Company Name"
                value={newExperience.companyName}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    companyName: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="position"
                placeholder="Position"
                value={newExperience.position}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    position: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                id="startDate"
                placeholder="Start Date"
                value={newExperience.startDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    startDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                id="endDate"
                placeholder="End Date"
                value={newExperience.endDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    endDate: e.target.value,
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
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </form>
        }
        actions={
          <button className="btn btn-secondary" onClick={handleAddExperience}>
            Save
          </button>
        }
      />

      {/* Edit Experience Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        title="Edit Experience"
        content={
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="companyName"
                placeholder="Company Name"
                value={newExperience.companyName}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    companyName: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="position"
                placeholder="Position"
                value={newExperience.position}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    position: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                id="startDate"
                placeholder="Start Date"
                value={newExperience.startDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    startDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                id="endDate"
                placeholder="End Date"
                value={newExperience.endDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    endDate: e.target.value,
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
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </form>
        }
        actions={
          <div>
            <button
              className="btn btn-danger me-2"
              onClick={handleDeleteExperience}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleUpdateExperience}
            >
              Update
            </button>
          </div>
        }
      />
    </div>
  );
};

export default Experience;
