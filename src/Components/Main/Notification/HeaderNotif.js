import React, { useState, useContext } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Avatar } from "@mui/material";
import { UserContext } from "../../../Context/LoginContext";
import { EventContext } from "../../../Context/EventContext";

const HeaderNotif = ({ title, description, isRead, status, notif, event }) => {
  const {userData, setUserData} = useContext(UserContext);
  const [clicked, setClicked] = useState(false);
  const [localIsRead, setLocalIsRead] = useState(isRead);

  console.log(notif);

  const handleClick = () => {
    if (localIsRead === 0 && notif!=event) {
      setClicked(true);
      setLocalIsRead(1);
      const fetchData = async () => {
        try {
          const response = await axios.put(
            "https://events-api-iuta.onrender.com/attend-event/change-notified",
            {
              userid: notif.userid,
              eventid: notif.eventid,
              status: notif.status,
              isread: 1,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchOrganizerData = async () => {
        try {
          const response = await axios.put(
            "https://events-api-iuta.onrender.com/attend-event/organizer-notified",
            {
              id: notif.id,
              isread: 1,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      if (notif.userid == userData.uid) {
        fetchData();
      } else {
        fetchOrganizerData();
      }
    }
  };

  return (
    <div className="HeaderNotif" onClick={handleClick}>
      <Avatar alt="event-icon" src={event.thumbnail} />
      <div className={`content ${localIsRead === 1 && "unread-notifs"}`}>
        <h4 className="title">{title}</h4>
        <p>{description}</p>
        <p>{status}</p>
      </div>
      {!localIsRead && !clicked && (
        <FontAwesomeIcon className="notif-blue" icon={faCircle} />
      )}
    </div>
  );
};

export default HeaderNotif;
