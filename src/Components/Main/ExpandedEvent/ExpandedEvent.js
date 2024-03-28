import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../../../Context/EventContext";
import {
  faCircle,
  faCircleCheck,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { UserContext } from "../../../Context/LoginContext";
import EventReviews from "../EventReviews/EventReviews";

const ExpandedEvent = () => {
  const { currentEvent, myEvents, fetchMyEvents } = useContext(EventContext);
  const [eventStatus, setEventStatus] = useState("");
  const { userData } = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // console.log(currentEvent);
  // console.log(myEvents);
  // console.log(eventStatus);

  // console.log(userData);
  // console.log(currentEvent);

  const handleJoininEvent = async () => {
    try {
      // setIsLoading(true); // Set loading state to true

      const response = await axios.post(
        "https://events-api-iuta.onrender.com/attend-event/interested",
        {
          eventid: currentEvent.eid,
          userid: userData.uid,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response);
      if (response.data) {
        setEventStatus("interested");
        fetchMyEvents();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // setError("An error occurred while logging in");
    } finally {
      // setIsLoading(false); // Set loading state to false after request completes
    }
  };
  const upvoteEvent = async () => {
    if (isHovered) {
      try {
        const response = await axios.put(
          "https://events-api-iuta.onrender.com/event/upvote",
          {
            eventid: currentEvent.eid,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const result = await response.data;
        console.log("myresult" + result);
      } catch (error) {
        console.error("Error upvoting event:", error);
      }
    }
  };

  useEffect(() => {
    myEvents.forEach((event) => {
      if (event.eventid === currentEvent.eid) {
        setEventStatus(event.status);
      }
    });
  }, [myEvents, currentEvent.eid]);

  return (
    <div className="ExpandedEvent">
      <div className="img-container">
        <img src={currentEvent.thumbnail} alt="" />
      </div>
      <div className="details">
        <div className="title">
          {currentEvent.eventname}
          <div>
            {isHovered || isClicked ? (
              <ThumbUpAltIcon
                className="upvote"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                  upvoteEvent();
                  setIsClicked(true);
                }}
              />
            ) : (
              <ThumbUpOffAltIcon
                className="upvote"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                  upvoteEvent();
                  setIsClicked(true);
                }}
              />
            )}
          </div>
        </div>

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
          <FontAwesomeIcon
            className="circle-check check-circle"
            icon={faCircleCheck}
          />{" "}
          Your request has been approved by the organizer.
        </p>
      ) : eventStatus === "interested" ? (
        <p className="request-popup">
          <FontAwesomeIcon
            className="circle-check request check-circle"
            icon={faCircleCheck}
          />{" "}
          Your request to join has been forwarded to the organizer.
        </p>
      ) : (
        <p className="request-popup">
          <FontAwesomeIcon
            className="check-circle no-request"
            icon={faQuestionCircle}
          />{" "}
          You can join this event by clicking the button below.
        </p>
      )}

      <button
        onClick={() => handleJoininEvent()}
        style={{
          pointerEvents: eventStatus === "interested" ? "none" : "auto",
          backgroundColor:
            eventStatus === "interested" ? "#e4e4e4" : "$faded-blue",
        }}
      >
        Join Event
      </button>

      <EventReviews />
    </div>
  );
};

export default ExpandedEvent;
