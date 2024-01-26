import React, { useState } from 'react';
import axios from 'axios';

const BackgroundBannerUpload = ({ userId, onUpdate }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        alert('Please choose a file before uploading');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      await axios.put(`/bg-banner/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Trigger a callback to update the UI or state after successful upload
      onUpdate();

      alert('Background Banner updated successfully');
    } catch (error) {
      console.error('Error uploading background banner:', error);
      alert('Error uploading background banner. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Background Banner</button>
    </div>
  );
};

export default BackgroundBannerUpload;
