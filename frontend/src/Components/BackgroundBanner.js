// BackgroundBanner.js
import React, { useState } from 'react';
import UploadImageComponent from './UploadImageComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BackgroundBanner = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const serverBaseUrl = 'http://localhost:3000';

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
    </div>
  );
};

export default BackgroundBanner;
