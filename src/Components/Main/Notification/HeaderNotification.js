import React, { useContext, useState, useEffect } from "react";
import HeaderNotif from "./HeaderNotif";
import { EventContext } from "./../../../Context/EventContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../Context/LoginContext";

const HeaderNotification = () => {
  const { data } = useContext(EventContext);
  const { allEvents } = useContext(EventContext);
  const { userID } = useParams();
  const { userData } = useContext(UserContext);
  const [notifs, setNotifs] = useState({});
  const [organizerNotifs, setOrganizerNotifs] = useState({});
  const [loading, setLoading] = useState(true);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [organizerOnly, setOrganizerOnly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://events-api-iuta.onrender.com/attend-event/view-by-user",
          {
            userid: userID,
            userid: userData.uid,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setNotifs(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrganizerData = async () => {
      try {
        const response = await axios.post(
          "https://events-api-iuta.onrender.com/attend-event/view-by-organizer",
          {
            organizer: userID,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setOrganizerNotifs(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (userData.user_type === "organizer") {
      fetchData();
      fetchOrganizerData();
    } else {
      fetchData();
    }
  }, [userID]);

  const findEventById = (eventId) => {
    for (const event of allEvents) {
      if (event.eid === eventId) {
        return event;
      }
    }
    return null;
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "approved":
      case "rejected":
        return `Organizer has ${status} your request to join this event`;
      case "interested":
        return "You have submitted a request to join this event";
      case "cancelled":
        return "You have cancelled your request to join this event";
      default:
        return "";
    }
  };

  const getUserRequest = (status) => {
    switch (status) {
      case "approved":
      case "rejected":
        return `You have ${status} a request to join this event`;
      case "interested":
        return "A user have submitted a request to join this event";
      case "cancelled":
        return "A user cancelled their request to join this event";
      default:
        return "";
    }
  };

  const handleViewUnread = () => {
    setOrganizerOnly(false);
    setUnreadOnly(true);
  };

  const handleViewOrganizer = () => {
    setUnreadOnly(false);
    setOrganizerOnly(true);
  };

  const handleViewAll = () => {
    setUnreadOnly(false);
    setOrganizerOnly(false);
  };

  const getEventStatus = (event) => {
    const capitalizedStatus =
      event.status.charAt(0).toUpperCase() + event.status.slice(1);

    const startDate = new Date(event.startdate);
    const formattedStartDate = startDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return `${capitalizedStatus} event on ${formattedStartDate}`;
  };

  const filteredNotifs = unreadOnly
    ? Object.values(notifs).filter((notif) => notif.isread === 0)
    : Object.values(notifs);

  const filteredOrganizerNotifs = unreadOnly
    ? Object.values(organizerNotifs).filter(
        (notif) => notif.isreadbyorganizer === 0
      )
    : Object.values(organizerNotifs);

  return (
    <div className="HeaderNotification">
      <div className="division">
        <h3>Notifications</h3>
      </div>
      <div className="division">
        <p
          className={!unreadOnly && !organizerOnly ? "active" : ""}
          onClick={handleViewAll}
        >
          All
        </p>
        <p
          className={unreadOnly && !organizerOnly ? "active" : ""}
          onClick={handleViewUnread}
        >
          Unread
        </p>
        {userData.user_type === "organizer" && (
          <p
            className={organizerOnly ? "active" : ""}
            onClick={handleViewOrganizer}
          >
            Requests
          </p>
        )}
      </div>

      <div className="notif-content">
        {filteredNotifs.length == 0 && filteredOrganizerNotifs == 0 && (
          <p>No notifications yet</p>
        )}
        {filteredOrganizerNotifs == 0 && organizerOnly && (
          <p>No notifications yet</p>
        )}
        {!organizerOnly &&
          filteredNotifs.map((notif, i) => {
            const event = findEventById(notif.eventid);
            if (notif.userid == userData.uid) {
              return (
                <HeaderNotif
                  key={i}
                  title={event ? event.eventname : "Unknown Event"}
                  description={getEventStatus(event)}
                  isRead={notif.isread}
                  status={getStatusMessage(notif.status)}
                  notif={notif}
                  event={event}
                />
              );
            }
          })}
        {userData.user_type === "organizer" &&
          filteredOrganizerNotifs.map((notif, i) => {
            const event = findEventById(notif.eventid);
            return (
              <HeaderNotif
                key={i}
                title={event ? event.eventname : "Unknown Event"}
                description={getUserRequest(notif.status)}
                isRead={notif.isreadbyorganizer}
                status={""}
                notif={notif}
                event={event}
              />
            );
          })}
      </div>
    </div>
  );
};

export default HeaderNotification;
