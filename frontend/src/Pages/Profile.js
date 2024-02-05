// Profile.js
import React from 'react';
import BackgroundBanner from '../Components/BackgroundBanner';
import Projects from '../Components/Projects';
import Experience from '../Components/Experience';

const Profile = () => {
  return (
    <div>
      <BackgroundBanner />
      <Projects/>
      <Experience/>
    </div>
  );
};

export default Profile;
