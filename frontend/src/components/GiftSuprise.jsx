import React, { useState } from 'react';
import "./GiftSuprise.css"// Import your CSS file for styling

const GiftSurprise = () => {
  const [revealed, setRevealed] = useState(false);

  const handleOpenGift = () => {
    setRevealed(true);
  };

  return (
    <div className="gift-container">
      <div className={`gift-box ${revealed ? 'opened' : ''}`} onClick={handleOpenGift}>
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="right"></div>
        <div className="front"></div>
      </div>
      {revealed && (
        <div className="gift-content">
          <h2>Your Surprise!</h2>
          <p>Here's your special gift: [Insert Surprise Content]</p>
        </div>
      )}
    </div>
  );
};

export default GiftSurprise;
