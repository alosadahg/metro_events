import React, { useContext, useEffect, useState } from "react";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventContext } from "../../../Context/EventContext";
import { Link } from "react-router-dom";

const EventReminders = () => {
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const { myEvents, allEvents, fetchMyEvents } = useContext(EventContext);
  const [joinedEvents, setJoinedEvents] = useState([]);

  console.log(myEvents);

  useEffect(() => {
    if (myEvents.length > 0) {
      let myEventsArray = allEvents.filter((event) =>
        myEvents.some((myEvent) => myEvent.eventid === event.eid)
      );
      setJoinedEvents(myEventsArray);
    }
  }, [myEvents, allEvents]);

  useEffect(() => {
    fetchMyEvents();
  }, []);
  return (
    <div className="EventReminders">
      <div className="content-wrapper">
        {isReminderOpen && (
          <div className="content">
            <Link to={"/joined-events"}>
              <p>You have {joinedEvents.length} upcoming events</p>
            </Link>
          </div>
        )}
        <div
          className="icon-container"
          onClick={() => setIsReminderOpen(!isReminderOpen)}
        >
          <p className="number">{joinedEvents.length}</p>
          <FontAwesomeIcon className="icon" icon={faNoteSticky} />
        </div>
      </div>
    </div>
  );
};

export default EventReminders;
