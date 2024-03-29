import React, { useContext, useEffect, useState } from "react";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderNotification from "../Main/Notification/HeaderNotification";
import { ModalContext } from "../../Context/ModalContext";
import { UserContext } from "../../Context/LoginContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { EventContext } from "../../Context/EventContext";

const Header = () => {
  const [modalState, setModalState] = useContext(ModalContext);
  const [isNotifClicked, setIsNotifClicked] = useState(false);
  const [isUserDropdown, setIsUserDropdown] = useState(false);

  const { userData, setUserData, setLoggedState, loggedState } =
    useContext(UserContext);
  const { setAllEvents } = useContext(EventContext);
  const { userID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://events-api-iuta.onrender.com/user/view-all"
        );

        response.data.forEach((user) => {
          if (user.uid === Number(userID)) {
            setUserData(user);
          }
        });
      } catch (error) {
        // setError(error);
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <nav className="Header">
      <Link to={`/event-discovery/${userData.uid}`}>
        <h2>MetroEvents</h2>
      </Link>
      <ul>
        <li className="name">Welcome, {userData && userData.email}!</li>
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
              <Link to={"/joined-events"}>
                <li>Joined events</li>
              </Link>
              {userData.user_type !== "organizer" && (
                <>
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
                </>
              )}

              {userData.user_type === "organizer" && (
                <Link to={"/organizer-dashboard"}>
                  <li>Organizer Dashboard</li>
                </Link>
              )}

              <Link to={"/login"}>
                <li
                  onClick={() => {
                    setLoggedState({
                      ...loggedState,
                      isLoggedIn: false,
                    });
                  }}
                >
                  Logout
                </li>
              </Link>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
