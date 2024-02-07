// Profile.js
import React from 'react';
import BackgroundBanner from '../Components/BackgroundBanner';
import Projects from '../Components/Projects';
import Experience from '../Components/Experience';
import Skills from '../Components/Skills';

const Profile = () => {
  return (
    <div>
      <BackgroundBanner />
      <Experience/>
      <Projects/>
      <Skills/>
    </div>
  );
};

export default Profile;
