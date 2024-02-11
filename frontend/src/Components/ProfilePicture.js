import React, { useState, useEffect } from "react";
import UploadImageComponent from "./UploadImageComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";

const ProfilePicture = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const serverBaseUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${serverBaseUrl}/profile-picture/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Getting: ", response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile picture data:", error);
      }
    };

    fetchProfileData();
  }, [token, successMessage]);

  const handleImageUpload = async (formData, endpoint) => {
    try {
      setLoading(true);

      const response = await axios.put(
        `${serverBaseUrl}/${endpoint}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(`${endpoint} uploaded successfully`);
      setProfileData(response.data);

      console.log("Updated Profile Data:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        setErrorMessage(`Error uploading ${endpoint}. Please try again.`);
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProfilePicture = async () => {
    try {
      setLoading(true);

      await axios.delete(`${serverBaseUrl}/profile-picture/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Profile Picture removed successfully");
      setProfileData(null);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        setErrorMessage("Error removing Profile Picture. Please try again.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefaultProfilePictureClick = () => {
    // Logic to set the default profile picture
  };

  const handleDefaultProfilePictureClick = () => {
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="row pt-4">
          <img
            key={profileData?.image}
            src={
              profileData && profileData.image && !profileData.isDefault
                ? `data:image/png;base64,${profileData.image}`
                : `${process.env.PUBLIC_URL}/images/defaultProfile.jpg`
            }
            alt=""
            style={{ maxWidth: "20%", marginTop: "-120px", borderRadius: '100px' }}
          />


      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Profile Picture</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body"></div>
              <div className="modal-footer">
                <UploadImageComponent
                  className="btn btn-secondary mt-2"
                  type="Profile Picture"
                  onUpload={(formData) =>
                    handleImageUpload(formData, "profile-picture/update")
                  }
                  loading={loading}
                  successMessage={successMessage}
                  errorMessage={errorMessage}
                />

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Save
                </button>
                {profileData && !profileData.isDefault && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleRemoveProfilePicture}
                    disabled={loading}
                  >
                    Delete
                  </button>
                )}
                {!profileData.isDefault && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSetDefaultProfilePictureClick}
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
