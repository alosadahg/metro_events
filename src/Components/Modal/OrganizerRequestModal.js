import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../../Context/LoginContext";

const OrganizerRequestModal = () => {
  const { userData } = useContext(UserContext);

  // console.log(userData);
  const updateOrganizerStatus = async (e) => {
    e.preventDefault();
    try {
      // setIsLoading(true);
      const response = await axios.put(
        "https://events-api-iuta.onrender.com/user/update-status",
        {
          email: userData.email,
          status: "pending",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <div className="content OrganizerRequestModal">
      <h4>Request Form</h4>
      <form action="">
        {/* <div>
          <label htmlFor="">Description</label>
          <input type="text" />
        </div>{" "}
        <div>
          <label htmlFor="">Description</label>
          <input type="text" />
        </div> */}
        <p>Upon approval, gains additional privileges</p>
        <ul>
          <li>Can create events of any type</li>
          <li>
            Reviews requests from users interested in joining their events
          </li>
          <li>Accepts or declines requests from users to join events</li>
          <li>Manages event details and participant lists</li>
        </ul>
        <button onClick={(e) => updateOrganizerStatus(e)}>
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default OrganizerRequestModal;
