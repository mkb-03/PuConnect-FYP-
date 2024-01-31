import React, { useState, useEffect } from 'react';
import UploadImageComponent from './UploadImageComponent';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  FaPen } from 'react-icons/fa';

const BackgroundBanner = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [bannerData, setBannerData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const serverBaseUrl = 'http://localhost:3000';

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
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, [token, successMessage]); // Added successMessage as a dependency

  const handleImageUpload = async (formData, endpoint) => {
    try {
      setLoading(true);

      const response = await axios.put(`${serverBaseUrl}/${endpoint}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage(`${endpoint} uploaded successfully`);
      setBannerData(response.data);

      console.log('Updated Banner Data:', response.data);


    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
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

      setSuccessMessage('Background Banner removed successfully');
      setBannerData(null);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        setErrorMessage('Error removing Background Banner. Please try again.');
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
    <div className='container'>

      <div class="row mt-5">
        <div class="col-8">

          <div className="card mb-3">
            <img
              key={bannerData?.bg_image} // Ensure key changes when the image changes
              src={
                bannerData && bannerData.bg_image && !bannerData.isDefault
                  ? `data:image/png;base64,${bannerData.bg_image}`
                  : `${process.env.PUBLIC_URL}/images/defaultBanner.jpg`
              }
              alt="Background Banner"
              style={{ maxWidth: '100%', marginBottom: '20px' }}
              
            />

            <FaPen
              className="position-absolute top-0 end-0"
              size={24}
              style={{ cursor: 'pointer', backgroundColor: 'white' , paddingBottom: '4px',  paddingLeft: '4px' }}
              onClick={handleDefaultBannerClick}
            />

            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>

        </div>
        <div class="col-4">Recommendation System</div>
      </div>



      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Background Banner</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">

              </div>
              <div className="modal-footer">

                <UploadImageComponent
                  className="btn btn-secondary mt-2"
                  type="Banner"
                  onUpload={(formData) => handleImageUpload(formData, 'bg-banner/update')}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundBanner;
