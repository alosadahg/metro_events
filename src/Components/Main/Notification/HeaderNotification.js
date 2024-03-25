import React, { useContext } from "react";
import HeaderNotif from "./HeaderNotif";
import { EventContext } from "./../../../Context/EventContext";

const HeaderNotification = () => {
  const { data } = useContext(EventContext);
  const notifs = [
    {
      title: "This is a fucking notification",
      description:
        "A quick brown son of a dragon ball z-kai jumped over a piece of crap",
      isRead: true,
    },
    {
      title: "This is a fucking notification",
      description:
        "A quick brown son of a dragon ball z-kai jumped over a piece of crap",
      isRead: false,
    },
    {
      title: "This is a fucking notification",
      description:
        "A quick brown son of a dragon ball z-kai jumped over a piece of crap",
      isRead: true,
    },
    {
      title: "This is a fucking notification",
      description:
        "A quick brown son of a dragon ball z-kai jumped over a piece of crap",
      isRead: false,
    },
    {
      title: "This is a fucking notification",
      description:
        "A quick brown son of a dragon ball z-kai jumped over a piece of crap",
      isRead: false,
    },
    {
      title: "This is a fucking notification",
      description:
        "A quick brown son of a dragon ball z-kai jumped over a piece of crap",
      isRead: false,
    },
  ];
  return (
    <div className="HeaderNotification">
      <div className="division">
        <h3>Notifications</h3>
        <p className="see-all">See all</p>
      </div>
      <div className="division">
        <p className="active">All</p>
        <p>Unread</p>
      </div>

      <div className="notif-content">
        {data.map((notif, i) => (
          <HeaderNotif
            title={notif.eventname}
            description={notif.description}
            isRead={notif.isRead}
            status={notif.status}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderNotification;
