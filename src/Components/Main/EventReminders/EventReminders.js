import React, { useContext, useEffect, useState } from "react";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventContext } from "../../../Context/EventContext";
import { Link } from "react-router-dom";

const EventReminders = () => {
  const { myEvents, fetchMyEvents } = useContext(EventContext);
  const [isReminderOpen, setIsReminderOpen] = useState(false);

  useEffect(() => {
    fetchMyEvents();
  }, []);
  return (
    <div className="EventReminders">
      <div className="content-wrapper">
        {isReminderOpen && (
          <div className="content">
            <Link to={"/joined-events"}>
              <p>You have {myEvents.length} upcoming events</p>
            </Link>
          </div>
        )}
        <div
          className="icon-container"
          onClick={() => setIsReminderOpen(!isReminderOpen)}
        >
          <p className="number">{myEvents.length}</p>
          <FontAwesomeIcon className="icon" icon={faNoteSticky} />
        </div>
      </div>
    </div>
  );
};

export default EventReminders;
