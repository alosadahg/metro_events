import React from "react";

const OrganizerRequestModal = () => {
  return (
    <div className="content OrganizerRequestModal">
      <h4>Request Form</h4>
      <form action="">
        <div>
          <label htmlFor="">Description</label>
          <input type="text" />
        </div>{" "}
        <div>
          <label htmlFor="">Description</label>
          <input type="text" />
        </div>
        <button>Submit Request</button>
      </form>
    </div>
  );
};

export default OrganizerRequestModal;
