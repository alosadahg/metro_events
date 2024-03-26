import React from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderNotif = ({ title, description, isRead, status }) => {
  return (
    <div className="HeaderNotif" style={{ display: "visible" }}>
      <FontAwesomeIcon className="icon" icon={faCircle} />
      <div className={`content ${!isRead && "unread-notifs"}`}>
        <h4 className="title">{title}</h4>
        <p>{description}</p>
        <p>{status}</p>
      </div>
      {isRead && <FontAwesomeIcon className="notif-blue" icon={faCircle} />}
    </div>
  );
};

export default HeaderNotif;
