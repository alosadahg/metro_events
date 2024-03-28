import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { EventContext } from "../../../Context/EventContext";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Thumbnail = ({ thumbnail, date, title, description, event, upvotes }) => {
  const mL = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const mS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { currentEvent, setCurrentEvent } = useContext(EventContext);

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.substring(0, maxLength) + "...";
    }
  };
  const convertedDate = new Date(date);
  return (
    <div
      className="Thumbnail"
      onClick={() => {
        // console.log(event);
        setCurrentEvent(event);
      }}
    >
      <Link to={`/expanded-event/${event.eid}`}>
        <div className="img-container">
          <img src={thumbnail} alt="" />
        </div>

        <div className="details">
          <div className="date">
            <p>{convertedDate.getDate()}</p>
            <p>{mS[convertedDate.getMonth()]}</p>

            <div className="upvotes">
              <ArrowDropUpIcon />
              {upvotes}
            </div>
          </div>
          <div className="description">
            <p className="title">{title}</p>
            <p className="desc">{truncateDescription(description, 145)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Thumbnail;
