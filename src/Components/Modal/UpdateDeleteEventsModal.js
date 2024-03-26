import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const UpdateDeleteEventsModal = ({ isModalOpen, closeForm, updatedEvent, handleInputChange, updateEvent, deleteEvent }) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={closeForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ borderRadius: '10px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <form>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label htmlFor="eventname">Event Name:</label>
            <input
              type="text"
              id="eventname"
              name="eventname"
              value={updatedEvent.eventname}
              onChange={handleInputChange}
              placeholder="Event Name"
            />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={updatedEvent.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={updatedEvent.location}
              onChange={handleInputChange}
              placeholder="Location"
            />
            <label htmlFor="startdate">Start Date:</label>
            <input
              type="text"
              id="startdate"
              name="startdate"
              value={updatedEvent.startdate}
              onChange={handleInputChange}
              placeholder="Start Date (yyyy-mm-dd)"
            />
            <label htmlFor="enddate">End Date:</label>
            <input
              type="text"
              id="enddate"
              name="enddate"
              value={updatedEvent.enddate}
              onChange={handleInputChange}
              placeholder="End Date (yyyy-mm-dd)"
            />
            <label htmlFor="status">Status:</label>
            <input
              type="text"
              id="status"
              name="status"
              value={updatedEvent.status}
              onChange={handleInputChange}
              placeholder="Status (ongoing, upcoming, cancelled, finished)"
            />
          </div>
          <br />
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="contained" color="primary" onClick={updateEvent}>
              Update
            </Button>
            <Button variant="contained" color="secondary" onClick={deleteEvent}>
              Delete
            </Button>
            <Button variant="contained" onClick={closeForm}>
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default UpdateDeleteEventsModal;
