import React, { useState } from "react";

const PBox = ({ images, heroBanner }) => {
  const [elipseIndex, setElipseIndex] = useState(0);
  return (
    <div className="PBox">
      <div className="img-container">
        {images.length === 1 && <img src={images[0]} alt="" />}
        {images.length > 1 && <img src={images[elipseIndex]} alt="" />}

        {images.length > 1 && (
          <div className="ellipses">
            <div className="ellipse active" />
            <div className="ellipse" />
            <div className="ellipse" />
          </div>
        )}

        {images.length > 1 && (
          <div className="hero-banner">
            <h1>{heroBanner}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default PBox;
