// BackgroundBanner.js
import React, { useState, useEffect } from 'react';
import UploadImageComponent from './UploadImageComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BackgroundBanner = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [bannerData, setBannerData] = useState(null); // Added state to store banner data
  const token = useSelector((state) => state.auth.token);
  const serverBaseUrl = 'http://localhost:3000';

  // Fetch banner data when the component mounts
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(`${serverBaseUrl}/bg-banner/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBannerData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBannerData();
  }, [token]);

  const handleImageUpload = async (formData, endpoint) => {
    try {
      setLoading(true);

      const response = await axios.post(`${serverBaseUrl}/${endpoint}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage(`${endpoint} uploaded successfully`);
      console.log(response.data);

      // Fetch updated banner data after successful upload
      const updatedResponse = await axios.get(`${serverBaseUrl}/bg-banner/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBannerData(updatedResponse.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login if unauthorized
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

      // Set banner data to null after successful removal
      setBannerData(null);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login if unauthorized
        navigate('/login');
      } else {
        setErrorMessage('Error removing Background Banner. Please try again.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Banner Upload */}
      <UploadImageComponent
        type="Banner"
        onUpload={(formData) => handleImageUpload(formData, 'bg-banner/add')}
        loading={loading}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      {/* Display Banner Image if available */}
      {bannerData && <img src={`data:image/png;base64,${bannerData.bg_image}`} alt="Background Banner" />}

      {/* Remove Banner Button */}
      {bannerData && (
        <button onClick={handleRemoveBanner} disabled={loading}>
          Remove Background Banner
        </button>
      )}
    </div>
  );
};

export default BackgroundBanner;
