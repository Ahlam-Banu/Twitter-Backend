import React from 'react';
import './TopBar.css'; // Import CSS for styling
import twitterLogo from '../../twitter-bird.png' // Import your Twitter logo image

const TopBar: React.FC = () => {
  return (
    <header className="top-bar">
      <img src={twitterLogo} alt="Twitter Logo" className="logo" />
      {/* <h1>Twitter</h1> */}
    </header>
  );
};

export default TopBar;