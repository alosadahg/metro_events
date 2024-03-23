import React from "react";
import HeaderNotif from "./HeaderNotif";

const HeaderNotification = () => {
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
        {notifs.map((notif, i) => (
          <HeaderNotif
            title={notif.title}
            description={notif.description}
            isRead={notif.isRead}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderNotification;
