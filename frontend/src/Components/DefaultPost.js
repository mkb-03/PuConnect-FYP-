import React, { useState } from "react";
import Modal from "./Modals/Modal";
import axios from "axios";
import ProfilePicture from "./ProfilePicture";

const DefaultPost = ({ isPostPic }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("picture", picture);

      await axios.post("/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setModalOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const modalTitle = "Create Post";
  const modalContent = (
    <div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="picture" className="form-label">
          Picture:
        </label>
        <input
          type="file"
          className="form-control"
          id="picture"
          accept="image/*"
          onChange={handlePictureChange}
        />
      </div>
    </div>
  );
  const modalActions = (
    <button className="btn btn-primary" onClick={handlePost}>
      Post
    </button>
  );

  return (
    <div>
      <div className="card mt-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-2">
              <ProfilePicture isPostPic={isPostPic} />
            </div>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control mt-1"
                placeholder="What's in your mind?"
                onClick={() => setModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        content={modalContent}
        actions={modalActions}
      />
    </div>
  );
};

export default DefaultPost;
