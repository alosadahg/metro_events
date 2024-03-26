import React, { useState } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Avatar } from "@mui/material";

const HeaderNotif = ({ title, description, isRead, status, notif, event }) => {
  const [clicked, setClicked] = useState(false);
  const [localIsRead, setLocalIsRead] = useState(isRead);

  console.log(notif);

  const handleClick = () => {
    if (localIsRead === 0) {
      setClicked(true);
      setLocalIsRead(1); // Update the local state
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

      fetchData();
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
