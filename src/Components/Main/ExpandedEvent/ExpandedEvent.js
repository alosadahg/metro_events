import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../../../Context/EventContext";
import {
  faCircle,
  faCircleCheck,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExpandedEvent = () => {
  const { currentEvent, myEvents } = useContext(EventContext);
  const [eventStatus, setEventStatus] = useState("");

  // console.log(currentEvent);
  // console.log(myEvents);
  // console.log(eventStatus);

  useEffect(() => {
    myEvents.forEach((event) => {
      if (event.eventid === currentEvent.eid) {
        setEventStatus(event.status);
      }
    });
  }, [myEvents]);

  return (
    <div className="ExpandedEvent">
      <div className="img-container">
        <img src={currentEvent.thumbnail} alt="" />
      </div>
      <div className="details">
        <p className="title">{currentEvent.eventname}</p>

        <div>
          <FontAwesomeIcon className="circle" icon={faCircle} />
          <FontAwesomeIcon className="circle" icon={faCircle} />
          <FontAwesomeIcon className="circle" icon={faCircle} />
        </div>

        <p>{currentEvent.description}</p>
        <p>
          <span className="label">Start date:</span>{" "}
          <span>{currentEvent.startdate}</span>
        </p>
        <p>
          <span className="label">End date: </span>
          <span>{currentEvent.enddate}</span>
        </p>
      </div>
      {/* checks */}
      {eventStatus === "approved" ? (
        <p className="request-popup">
          <FontAwesomeIcon className="circle-check" icon={faCircleCheck} /> Your
          request has been approved by the organizer.
        </p>
      ) : eventStatus === "interested" ? (
        <p className="request-popup">
          <FontAwesomeIcon
            className="circle-check request"
            icon={faCircleCheck}
          />{" "}
          Your request to join has been forwarded to the organizer.
        </p>
      ) : (
        <p className="request-popup">
          <FontAwesomeIcon className=" no-request" icon={faQuestionCircle} />{" "}
          You can join this event by clicking the button below.
        </p>
      )}

      <button>Join Event</button>
    </div>
  );
};

export default ExpandedEvent;
