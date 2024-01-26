import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadImageComponent from '../Components/UploadImageComponent';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
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
      <h1>Profile Page</h1>

      {/* Banner Upload */}
      <UploadImageComponent
        type="Banner"
        onUpload={(formData) => handleImageUpload(formData, 'bg-banner/add')}
        loading={loading}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      {/* Profile Picture Upload */}
      <UploadImageComponent
        type="Profile"
        onUpload={(formData) => handleImageUpload(formData, 'profile-picture/update')}
        loading={loading}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default ProfilePage;
