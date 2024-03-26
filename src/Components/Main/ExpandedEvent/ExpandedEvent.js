import React, { useContext } from "react";
import { EventContext } from "../../../Context/EventContext";
import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExpandedEvent = () => {
  const { currentEvent } = useContext(EventContext);

  console.log(currentEvent);
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
      <p className="request-popup">
        <FontAwesomeIcon className="circle-check" icon={faCircleCheck} /> Your
        request to join has been sent to the organizer.
      </p>
      <button>Join Event</button>
    </div>
  );
};

export default ExpandedEvent;
