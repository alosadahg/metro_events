import React, { useState } from "react";
import { faUserCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EventReviews = () => {
  const data = [
    {
      user: "lucky",
      review:
        "gchajkk asiodas asd jas jdijajskd ajksd kashdkj ashj dahsjkdh askdh asdk skd ajksd kashdkj ashj dahsjkdh askdh asdk skd ajksd kashdkj ashj dahsjkdh askdh asdk",
      rating: 5,
      date: "3/26/2024",
    },
    {
      user: "lucky",
      review:
        "gchajkk asiodas asd jas jdijajskd ajksd kashdkj ashj dahsjkdh askdh asdk skd ajksd kashdkj ashj dahsjkdh askdh asdk skd ajksd kashdkj ashj dahsjkdh askdh asdk",
      rating: 2,
      date: "3/26/2024",
    },
    {
      user: "lucky",
      review:
        "gchajkk asiodas asd jas jdijajskd ajksd kashdkj ashj dahsjkdh askdh asdk skd ajksd kashdkj ashj dahsjkdh askdh asdk skd ajksd kashdkj ashj dahsjkdh askdh asdk",
      rating: 3,
      date: "3/26/2024",
    },
    {
      user: "lucky",
      review:
        "gchajkk asiodas asd jas jdijajskd ajksd kashdkj ashj dahsjkdh askdh asdk skd ajksd kashdkj ashj dahsjkdh askdh asdk skd ajksd kashdkj ashj dahsjkdh askdh asdk",
      rating: 4,
      date: "3/26/2024",
    },
  ];

  const test = (num) => {
    let x = [];
    for (let i = 0; i < num; i++) {
      x.push(i);
    }

    return x;
  };

  const [isHovered, setIsHovered] = useState(false);
  const [currPos, setCurrPos] = useState(0);

  const handleMouseEnter = (i) => {
    console.log(i);
    setCurrPos(i);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setCurrPos(-1);
    setIsHovered(false);
  };
  return (
    <div className="EventReviews">
      <h4>Write a review</h4>
      <div className="review-container">
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <div className="button-container">
          <button>Add Review</button>
          <div className="rating-star-container">
            {test(5).map((star, i) => (
              <FontAwesomeIcon
                className="rating-star"
                icon={faStar}
                style={{
                  color: currPos < i ? "#e4e4e4" : "#febb02",
                }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>
      </div>

      <ul>
        {data.map((review) => (
          <li>
            <div>
              <div className="user-container">
                <FontAwesomeIcon className="icon" icon={faUserCircle} />
                <p>{review.user}</p>
              </div>
              <div>
                <p>
                  {test(review.rating).map((star) => (
                    <FontAwesomeIcon className="star" icon={faStar} />
                  ))}
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
