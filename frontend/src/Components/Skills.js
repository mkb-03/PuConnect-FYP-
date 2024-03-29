import React, { useState, useEffect } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import Modal from "./Modals/Modal";
import axios from "axios";
import { useSelector } from "react-redux";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: "",
    description: "",
    link: "",
  });
  const [selectedSkillForEdit, setSelectedSkillForEdit] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const fetchSkills = async () => {
    try {
      const response = await axios.get("http://localhost:3000/skill/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [token]); // Fetch skills on component mount or when the token changes

  const handleAddSkill = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/skill/create",
        newSkill,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSkills([...skills, response.data]);
      setNewSkill({
        name: "",
        description: "",
        link: "",
      });
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleEditSkill = (skill) => {
    setSelectedSkillForEdit(skill);
    setNewSkill({
      name: skill.name,
      description: skill.description,
      link: skill.link,
    });
    setEditModalOpen(true);
  };

  const handleUpdateSkill = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/skill/update/${selectedSkillForEdit._id}`,
        newSkill,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedSkills = skills.map((skill) =>
        skill._id === selectedSkillForEdit._id ? response.data.skill : skill
      );

      setSkills(updatedSkills);
      setNewSkill({
        name: "",
        description: "",
        link: "",
      });
      setEditModalOpen(false);
      setSelectedSkillForEdit(null);
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  const handleDeleteSkill = async () => {
    try {
      if (!selectedSkillForEdit) {
        console.error("No skill selected for deletion");
        return;
      }

      await axios.delete(
        `http://localhost:3000/skill/delete/${selectedSkillForEdit._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedSkills = skills.filter(
        (skill) => skill._id !== selectedSkillForEdit._id
      );

      setSkills(updatedSkills);
      setEditModalOpen(false);
      setSelectedSkillForEdit(null);
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const handleOpenAddModal = () => {
    setNewSkill({
      name: "",
      description: "",
      link: "",
    });
    setAddModalOpen(true);
  };

  const handleOpenEditModal = (skill) => {
    setSelectedSkillForEdit(skill);
    setNewSkill({
      name: skill.name,
      description: skill.description,
      link: skill.link,
    });
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setSelectedSkillForEdit(null);
  };

  return (
    <div className="container" style={{ marginTop: "-6px" }}>
      <div className="row">
        <div className="col col-9">
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Skills</h5>
                <div className="d-flex">
                  <FaPlus
                    className="me-2"
                    size={20}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      padding: "4px",
                    }}
                    onClick={handleOpenAddModal}
                  />
                </div>
              </div>
              {skills.length === 0 ? (
                <p className="card-text mt-4">Add skills</p>
              ) : (
                <div className="mt-4">
                  {skills.map((skill) => (
                    <div key={skill._id}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mt-3">{skill.name}</h6>
                        <FaPen
                          size={22}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "white",
                            padding: "4px",
                          }}
                          onClick={() => handleOpenEditModal(skill)}
                        />
                      </div>
                      <p>{skill.description}</p>

                      {skill.link ? (
                        <a
                          className="projectLink"
                          href={skill.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Show Certificate
                        </a>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col col-3"></div>
      </div>

      {/* Add Skill Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        title="Add Skill"
        content={
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Skill"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    name: e.target.value,
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
                value={newSkill.description}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
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
                placeholder="Certificate Link"
                value={newSkill.link}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    link: e.target.value,
                  })
                }
              />
            </div>
          </form>
        }
        actions={
          <button className="btn btn-secondary" onClick={handleAddSkill}>
            Save
          </button>
        }
      />

      {/* Edit Skill Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        title="Edit Skill"
        content={
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Skill Name"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    name: e.target.value,
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
                value={newSkill.description}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
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
                value={newSkill.link}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    link: e.target.value,
                  })
                }
              />
            </div>
          </form>
        }
        actions={
          <div>
            <button className="btn btn-danger me-2" onClick={handleDeleteSkill}>
              Delete
            </button>
            <button className="btn btn-secondary" onClick={handleUpdateSkill}>
              Update
            </button>
          </div>
        }
      />
    </div>
  );
};

export default Skills;
