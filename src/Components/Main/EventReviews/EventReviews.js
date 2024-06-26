import React, { useContext, useState } from "react";
import { faUserCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { UserContext } from "../../../Context/LoginContext";
import axios from "axios";
import { EventContext } from "../../../Context/EventContext";

const EventReviews = () => {
  const [textReview, setTextReview] = useState("");
  const { userData } = useContext(UserContext);
  const { currentEvent } = useContext(EventContext);
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(-1);

  const textReviewHandler = (event) => {
    if (event.target.value.length > 0) setTextReview(event.target.value);
  };

  const addReviewHandler = () => {
    if (textReview.length > 0) {
      const addReview = async () => {
        try {
          const response = await axios.post(
            "https://events-api-iuta.onrender.com/reviews/add",
            {
              userid: userData.uid,
              eventid: currentEvent.eid,
              review: textReview,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          if (
            typeof response.data === "string" &&
            response.data === "Review already exists"
          ) {
            alert("You have already added a review for this event!");

            setTextReview("");
            return;
          }
          fetchData();
          setTextReview("");
          setIsClicked(false);
        } catch (error) {
          console.error("Error adding review:", error);
        }
      };

      addReview();
    } else {
      alert("Please enter a review");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `https://events-api-iuta.onrender.com/reviews/view-by-event`,
        {
          eventid: currentEvent.eid,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const result =
        typeof response.data === "string" ? [] : await response.data;

      const updatedData = await Promise.all(
        result.map(async (review) => {
          try {
            const response = await axios.post(
              "https://events-api-iuta.onrender.com/user/view-by-id",
              {
                userid: review.userid,
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );
            const { firstname, lastname } = await response.data;
            return {
              ...review,
              firstName: firstname,
              lastName: lastname,
            };
          } catch (error) {
            console.error("Error fetching user details:", error);
            return review; // Return original review if an error occurs
          }
        })
      );

      setData(updatedData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentEvent.eid]);

  const test = (num) => {
    let x = [];
    for (let i = 0; i < num; i++) {
      x.push(i);
    }

    return x;
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currPos, setCurrPos] = useState(-1);

  const handleMouseEnter = (i) => {
    console.log(i);
    setCurrPos(i);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setCurrPos(-1);
    setIsHovered(false);
  };

  const handleMouseClick = (i) => {
    console.log(i + 1);
    setCurrPos(i + 1);
    setRating(i + 1);
    setIsClicked(true);
  };

  return (
    <div className="EventReviews">
      <h4>Write a review</h4>
      <div className="review-container">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={textReview}
          onChange={textReviewHandler}
        ></textarea>
        <div className="button-container">
          <button onClick={addReviewHandler}>Add Review</button>
          <div className="rating-star-container">
            {test(5).map((star, i) => (
              <FontAwesomeIcon
                key={i}
                className="rating-star"
                icon={faStar}
                style={{
                  color: currPos < i && !isClicked ? "#e4e4e4" : "#febb02",
                }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleMouseClick(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <ul>
        {data.map((review, i) => (
          <li key={i}>
            <div>
              <div className="user-container">
                <FontAwesomeIcon className="icon" icon={faUserCircle} />
                <p>
                  {review.firstName} {review.lastName}
                </p>
              </div>
            </div>
            <div>
              <p className="description">{review.review}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventReviews;
