// Profile.js
import React from 'react';
import BackgroundBanner from '../Components/BackgroundBanner';
import Projects from '../Components/Projects';
import Experience from '../Components/Experience';

const Profile = () => {
  return (
    <div>
      <BackgroundBanner />
      <Experience/>
      <Projects/>
    </div>
  );
};

export default Profile;
