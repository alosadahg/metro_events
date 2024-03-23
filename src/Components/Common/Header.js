import React from "react";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <nav className="Header">
      <h2>MetroEvents</h2>
      <ul>
        <li>Welcome, Tanga!</li>
        <li>
          <FontAwesomeIcon icon={faBell} />
        </li>
        <li>
          <FontAwesomeIcon icon={faUserCircle} />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
