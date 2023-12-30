import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux Toolkit/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    if (!userId) {
      console.error('User ID is undefined');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch(`http://localhost:3000/bg-banner/${userId}`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Assuming your API returns the updated user object
        const updatedUser = await response.json();

        // Dispatch the login action with the updated user object
        dispatch(login(updatedUser));
        console.log('Banner uploaded successfully', updatedUser);
      } else {
        console.error('Error uploading banner', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading banner', error);
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Banner</button>
      {/* Your profile content goes here */}
    </>
  );
};

export default Profile;
