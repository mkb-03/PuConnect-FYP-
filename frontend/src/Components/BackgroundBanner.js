import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import UploadImageComponent from "./UploadImageComponent";
import Modal from "./Modals/Modal";
import ProfilePicture from "./ProfilePicture";
const BackgroundBanner = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [bannerData, setBannerData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [uploadImageKey, setUploadImageKey] = useState(0);
  const serverBaseUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(`${serverBaseUrl}/bg-banner/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Getting: ", response.data);
        setBannerData(response.data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBannerData();
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
      setBannerData(response.data);

      console.log("Updated Banner Data:", response.data);
      setShowModal(false); // Close the modal after successful upload
      setUploadImageKey((prevKey) => prevKey + 1);
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

  const handleRemoveBanner = async () => {
    try {
      setLoading(true);

      await axios.delete(`${serverBaseUrl}/bg-banner/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Background Banner removed successfully");
      setBannerData(null);

      console.log("Deleted Background Banner");
      setShowModal(false); // Close the modal after successful deletion
      setUploadImageKey((prevKey) => prevKey + 1);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        setErrorMessage("Error removing Background Banner. Please try again.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDefaultBannerClick = () => {
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="row pt-4">
        <div className="col-9">
          <div className="card mb-3">
            <img
              key={bannerData?.bg_image}
              src={
                bannerData && bannerData.bg_image && !bannerData.isDefault
                  ? `data:image/png;base64,${bannerData.bg_image}`
                  : `${process.env.PUBLIC_URL}/images/defaultBanner.jpg`
              }
              alt="Background Banner"
              style={{ maxWidth: "100%", marginBottom: "20px" }}
            />

            <FaPen
              className="position-absolute top-0 end-0"
              size={24}
              style={{
                cursor: "pointer",
                backgroundColor: "white",
                padding: "4px",
              }}
              onClick={handleDefaultBannerClick}
            />

            {/* Reusable Modal component for CRUD operations */}
            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title="Background Banner"
              content={
                <UploadImageComponent
                  key={uploadImageKey} // Set the key for UploadImageComponent
                  className="btn btn-secondary mt-2"
                  type="Banner"
                  onUpload={(formData) =>
                    handleImageUpload(formData, "bg-banner/update")
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
                  {bannerData && !bannerData.isDefault && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleRemoveBanner}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  )}
                </>
              }
            />

            <ProfilePicture />
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">
                {user && user.semester >= 1 && user.semester <= 8
                  ? `Student | ${user.rollNo} `
                  : `Alumni | ${user.rollNo}`}
              </p>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
        <div className="col-3">Recommendation System</div>
      </div>
    </div>
  );
};

export default BackgroundBanner;
