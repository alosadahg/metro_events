import React, { useContext, useState } from "react";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderNotification from "../Main/Notification/HeaderNotification";
import { ModalContext } from "../../Context/ModalContext";

const Header = () => {
  const [modalState, setModalState] = useContext(ModalContext);

  const [isNotifClicked, setIsNotifClicked] = useState(false);
  const [isUserDropdown, setIsUserDropdown] = useState(false);
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
        <li className="user-icon">
          <FontAwesomeIcon
            icon={faUserCircle}
            onClick={() => setIsUserDropdown(!isUserDropdown)}
          />

          {isUserDropdown && (
            <ul className="user-dropdown">
              <li>Profile</li>
              <li>Joined events</li>
              <li
                onClick={() => {
                  setModalState({
                    ...modalState,
                    content: "organizerRequestModal",
                    open: true,
                  });
                }}
              >
                Become and organizer
              </li>
              <li>Logout</li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
