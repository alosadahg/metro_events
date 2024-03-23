import React, { useState } from "react";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderNotification from "../Main/Notification/HeaderNotification";

const Header = () => {
  const [isNotifClicked, setIsNotifClicked] = useState(false);
  return (
    <nav className="Header">
      <h2>MetroEvents</h2>
      <ul>
        <li>Welcome, Tanga!</li>
        <li className="notif">
          <FontAwesomeIcon
            icon={faBell}
            className="icon"
            onClick={() => setIsNotifClicked(!isNotifClicked)}
          />
          {isNotifClicked && <HeaderNotification />} {/*the notification*/}
        </li>
        <li>
          <FontAwesomeIcon icon={faUserCircle} />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
