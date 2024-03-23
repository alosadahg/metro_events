import React from "react";

const Thumbnail = ({ thumbnail, date, title, description }) => {
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

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.substring(0, maxLength) + "...";
    }
  };
  const convertedDate = new Date(date);
  return (
    <div className="Thumbnail">
      <div className="img-container">
        <img src={thumbnail} alt="" />
      </div>

      <div className="details">
        <div className="date">
          <p>{convertedDate.getDate()}</p>
          <p>{mS[convertedDate.getMonth()]}</p>
        </div>
        <div className="description">
          <p className="title">{title}</p>
          <p className="desc">{truncateDescription(description, 175)}</p>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
