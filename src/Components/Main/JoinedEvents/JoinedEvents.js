import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { EventContext } from "../../../Context/EventContext";
import { UserContext } from "../../../Context/LoginContext";

const JoinedEvents = () => {
  const { myEvents, allEvents, fetchMyEvents } = useContext(EventContext);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  useEffect(() => {
    if (myEvents.length > 0) {
      let myEventsArray = allEvents.filter((event) =>
        myEvents.some((myEvent) => myEvent.eventid === event.eid)
      );
      setJoinedEvents(myEventsArray);
    }
  }, [myEvents, allEvents]);

  const handleCancel = async (eventId) => {
    console.log(userData.uid);
    console.log(eventId);
    try {
      if (eventId) {
        const response = await axios.delete(
          "https://events-api-iuta.onrender.com/attend-event/cancel",
          {
            userid: userData.uid,
            eventid: eventId,
          }
        );

        console.log(response);
        fetchMyEvents();
      } else {
        console.error("No event ID provided for cancellation");
      }
    } catch (error) {
      console.error("Error cancelling event:", error);
      alert("Failed to cancel event. Please try again later.");
    } finally {
      // setIsLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <div className="JoinedEvents">
      <h4>Joined Events</h4>
      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {joinedEvents.map((event, i) => (
            <tr key={i}>
              <td className="event-id">{event.eid}</td>
              <td>{event.eventname}</td>
              <td>{event.description}</td>
              <td>{event.location}</td>
              <td className="dates">{event.startdate}</td>
              <td className="dates">{event.enddate}</td>
              <td>{event.status}</td>
              <td>
                {/* Attach handleCancel function to onClick event */}
                <button onClick={() => handleCancel(event.eid)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JoinedEvents;
