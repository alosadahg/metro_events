import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [index, setIndex] = useState(0);

  const [textArray] =  useState([
    "Join the Metro Events and go to cool parties and activities, or you can plan your events and have fun together.",
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index === textArray.length) {
        clearInterval(intervalId);
      } else {
        setText(textArray[index].substring(0, text.length + 1));
        if (text === textArray[index]) {
          setTimeout(() => {
            setIndex(index + 1);
          }, 1000); // Delay before moving to the next text
        }
      }
    }, 30); // Typing speed
    return () => clearInterval(intervalId);
  }, [text, index, textArray]);
  return (
    <div className="LandingPage">
      <div className="hero-banner-container">
        <div>
          <h1>METRO</h1>
          <h1>EVENTS.</h1>
        </div>
        <p className="description">{text}</p>
        <Link className="register-here" to={"/register"}>
          Register Here!
        </Link>
      </div>
      <div className="image-container">
        <img
          src="https://images.unsplash.com/photo-1496024840928-4c417adf211d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
};

export default LandingPage;
