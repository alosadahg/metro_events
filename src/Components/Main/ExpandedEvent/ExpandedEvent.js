import React, { useContext } from "react";
import { EventContext } from "../../../Context/EventContext";

const ExpandedEvent = () => {
  const { currentEvent } = useContext(EventContext);

  console.log(currentEvent);
  return (
    <div className="ExpandedEvent">
      <div className="img-container">
        <img src={currentEvent.thumbnail} alt="" />
      </div>

      <div>
        <p>{currentEvent.eventname}</p>
        <p>{currentEvent.description}</p>
        <p>{currentEvent.startdate}</p>
        <p>{currentEvent.enddate}</p>
      </div>
      <button>Join Event</button>
    </div>
  );
};

export default ExpandedEvent;
