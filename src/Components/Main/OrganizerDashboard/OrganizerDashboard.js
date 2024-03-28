import React, { useState } from "react";
import { Button } from "@mui/material";
import ParticipantModal from "../../Modal/ParticipantModal"; 
import CreateEventModal from "../../Modal/CreateEventModal";
import SettingsIcon from '@mui/icons-material/Settings';

const OrganizerDashboard = () => {
  const [showParticipantModal, setShowParticipantModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

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

  return (
    <div className="JoinedEvents">
      <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Organizer Dashboard
        <Button onClick={handleCreateEventModalOpen} variant="contained" color="primary">Create Event</Button>
      </h4>
      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th style={{ paddingLeft: '90px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="event-id"></td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td className="dates">-</td>
            <td className="dates">-</td>
            <td>-</td>
            <td>
              <Button onClick={handleParticipantModalOpen} style={{ backgroundColor: '#455a71', color: '#fff' }}>Participants</Button>
              <Button style={{ width: '5px', marginLeft:'10px', backgroundColor: '#455a71', color: '#fff' }}>
                <SettingsIcon />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>

      <ParticipantModal open={showParticipantModal} handleClose={handleParticipantModalClose} />

      <CreateEventModal open={showCreateEventModal} handleClose={handleCreateEventModalClose} />
    </div>
  );
};

export default OrganizerDashboard;
