import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UploadImageComponent from "./UploadImageComponent";
import Modal from "./Modals/Modal"; // Import your Modal component

const ProfilePicture = ({ isHomePage, isPostPic, isProfilePage }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [uploadImageKey, setUploadImageKey] = useState(0); // Add key for resetting UploadImageComponent
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
  }, [token, successMessage, showModal]);

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
      setShowModal(false); // Close the modal after successful upload
      setUploadImageKey((prevKey) => prevKey + 1); // Increment the key to reset UploadImageComponent
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

      console.log("Deleted Profile Picture");
      setShowModal(false); // Close the modal after successful deletion
      setUploadImageKey((prevKey) => prevKey + 1);
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

  const getProfilePicStyle = () => {
    let style = {
      // Common styles
      cursor: "pointer",
      borderRadius: "100%",
    };

    if(isProfilePage)
    {
      style = {
        ...style,
        maxWidth: "20%",
        maxHeight: "20%",
        marginTop: "-120px",
      }
    }

    // Apply different styles based on the context
    if (isHomePage) {
      style = {
        ...style,
        maxHeight: "auto",
        maxWidth: "auto",
        marginTop: "-70px",
      };
    }

    if (isPostPic) {
      style = {
        ...style,
        maxHeight: "13%",
        maxWidth: "13%",
      };
    }

    return style;
  };


  return (
    <div className="container">
      <div className="row pt-4">
        <img
          key={profileData?.image}
          src={
            profileData && profileData.image && !profileData.isDefault
              ? `data:image/png;base64,${profileData.image}`
              : `${process.env.PUBLIC_URL}/images/defaultProfile.png`
          }
          alt="ProfilePic"
          style={getProfilePicStyle()}
          onClick={() =>
            isHomePage || isPostPic ? navigate("/profile") : setShowModal(true)
          }
        />
      </div>

      {/* Bootstrap Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Profile Picture"
        content={
          <UploadImageComponent
            key={uploadImageKey} // Set the key for UploadImageComponent
            className="btn btn-secondary mt-2"
            type="Profile Picture"
            onUpload={(formData) =>
              handleImageUpload(formData, "profile-picture/update")
            }
            loading={loading}
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
        }
        actions={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Close
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
          </>
        }
      />
    </div>
  );
};

export default ProfilePicture;
