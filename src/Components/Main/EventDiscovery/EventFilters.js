import React from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EventFilters = () => {
  return (
    <div className="EventFilters">
      <ul>
        <p>
          Categories <FontAwesomeIcon className="icon" icon={faChevronUp} />
        </p>
        <li>
          <input type="radio" />
          Category 1
        </li>{" "}
        <li>
          <input type="radio" />
          Category 1
        </li>{" "}
        <li>
          <input type="radio" />
          Category 1
        </li>
      </ul>{" "}
      <ul>
        <p>
          Categories <FontAwesomeIcon className="icon" icon={faChevronUp} />
        </p>
        <li>
          <input type="checkbox" />
          Oten 1
        </li>{" "}
        <li>
          <input type="checkbox" />
          Oten 1
        </li>{" "}
        <li>
          <input type="checkbox" />
          Oten 1
        </li>
      </ul>
    </div>
  );
};

export default EventFilters;
