import React, { useContext, useState, useEffect } from "react";
import HeaderNotif from "./HeaderNotif";
import { EventContext } from "./../../../Context/EventContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const HeaderNotification = () => {
  const { data } = useContext(EventContext);
  const { userID } = useParams();
  const [notifs, setNotifs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://events-api-iuta.onrender.com/attend-event/view-by-user",
          {
            userid:userID
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );
        setNotifs(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  const findEventById = (eventId) => {
    for (const event of data) {
      if (event.eid === eventId) {
        return event;
      }
    }
    return null;
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "approved":
        return "Organizer has approved your request to join this event";
      case "rejected":
        return "Organizer has rejected your request to join this event";
      case "interested":
        return "You have submitted a request to join this event";
      case "cancelled":
        return "You have cancelled your request to join this event";
      default:
        return "";
    }
  };

  const getEventStatus = (event) => {
    const capitalizedStatus = event.status.charAt(0).toUpperCase() + event.status.slice(1);
  
    const startDate = new Date(event.startdate);
    const formattedStartDate = startDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  
    return `${capitalizedStatus} event on ${formattedStartDate}`;
  };

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
        {Object.values(notifs).map((notif, i) => {
          const event = findEventById(notif.eventid);
          return (
            <HeaderNotif
              title={event ? event.eventname : "Unknown Event"}
              description={getEventStatus(event)}
              isRead={event.isread}
              status={getStatusMessage(notif.status)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeaderNotification;
