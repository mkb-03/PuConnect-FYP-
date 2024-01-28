import React, { useState } from 'react';

const UploadImageComponent = ({ type, onUpload }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const fileSize = selectedImage.size / (1024 * 1024); // Convert to MB

      // Check file type and size
      if (['image/jpeg', 'image/png'].includes(selectedImage.type) && fileSize <= 5) {
        setImage(selectedImage);
        setError(null);
      } else {
        setImage(null);
        setError('Invalid file format or size (Max: 5MB, JPEG/PNG only)');
      }
    }
  };

  const handleUpload = (e) => {
    // Perform any additional checks or validations if needed
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      // Clear the input field after successful upload
      e.target.value = '';

      // Call the provided onUpload function with the image data
      onUpload(formData);
    } else {
      setError('Please select a valid image before uploading.');
    }
  };

  return (
    <div>
      <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleUpload}>Upload {type} Picture</button>
    </div>
  );
};

export default UploadImageComponent;
