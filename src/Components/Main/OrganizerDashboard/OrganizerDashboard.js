import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import ParticipantModal from "../../Modal/ParticipantModal";
import CreateEventModal from "../../Modal/CreateEventModal";
import SettingsIcon from "@mui/icons-material/Settings";
import { UserContext } from "../../../Context/LoginContext";
import { EventContext } from "../../../Context/EventContext";

const OrganizerDashboard = () => {
  const [showParticipantModal, setShowParticipantModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [organizerEvents, setOrganizerEvents] = useState([]);
  const { allEvents, fetchAllEvents } = useContext(EventContext);
  const { userData } = useContext(UserContext);

  const handleParticipantModalOpen = () => {
    setShowParticipantModal(true);
  };

  const handleParticipantModalClose = () => {
    setShowParticipantModal(false);
  };

  const handleCreateEventModalOpen = () => {
    setShowCreateEventModal(true);
  };

  const handleCreateEventModalClose = () => {
    setShowCreateEventModal(false);
  };

  useEffect(() => {
    setOrganizerEvents(
      allEvents.filter((event) => event.organizer === userData.uid)
    );
  }, []);

  return (
    <div className="JoinedEvents">
      <h4
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Organizer Dashboard
        <Button
          onClick={handleCreateEventModalOpen}
          variant="contained"
          color="primary"
        >
          Create Event
        </Button>
      </h4>
      <table>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th style={{ paddingLeft: "90px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {organizerEvents &&
            organizerEvents.map((event) => {
              return (
                <tr key={event.eid}>
                  <td className="event-id">{event.eid}</td>
                  <td>{event.eventname}</td>
                  <td
                    style={{
                      width: "250px",
                    }}
                  >
                    {event.description}
                  </td>
                  <td>{event.location}</td>
                  <td className="dates">{event.startdate}</td>
                  <td className="dates">{event.enddate}</td>
                  <td>{event.status}</td>
                  <td>
                    <Button
                      onClick={handleParticipantModalOpen}
                      style={{
                        backgroundColor: "#455a71",
                        color: "#fff",
                        width: "120px",
                      }}
                    >
                      Participants
                    </Button>
                    <Button
                      style={{
                        width: "5px",
                        marginLeft: "10px",
                        backgroundColor: "#455a71",
                        color: "#fff",
                      }}
                    >
                      <SettingsIcon />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <ParticipantModal
        open={showParticipantModal}
        handleClose={handleParticipantModalClose}
      />

      <CreateEventModal
        open={showCreateEventModal}
        handleClose={handleCreateEventModalClose}
      />
    </div>
  );
};

export default OrganizerDashboard;
