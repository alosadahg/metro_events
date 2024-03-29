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
      <Box sx={{ borderRadius: '10px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 650, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <form>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>Edit Event</h3>
            <label htmlFor="eventname" style={{ fontWeight: 'bold' }}>Event Name:</label>
            <input
              type="text"
              id="eventname"
              name="eventname"
              value={updatedEvent.eventname}
              onChange={handleInputChange}
              placeholder="Event Name"
            />
            <label htmlFor="description" style={{ fontWeight: 'bold' }}>Description:</label>
            <textarea
              id="description"
              name="description"
              value={updatedEvent.description}
              onChange={handleInputChange}
              rows={4} // Adjust the number of rows as needed
              placeholder="Description"
            />
            <label htmlFor="location" style={{ fontWeight: 'bold' }}>Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={updatedEvent.location}
              onChange={handleInputChange}
              placeholder="Location"
            />
            <label htmlFor="startdate" style={{ fontWeight: 'bold' }}>Start Date:</label>
            <input
              type="text"
              id="startdate"
              name="startdate"
              value={updatedEvent.startdate}
              onChange={handleInputChange}
              placeholder="Start Date (yyyy-mm-dd)"
            />
            <label htmlFor="enddate" style={{ fontWeight: 'bold' }}>End Date:</label>
            <input
              type="text"
              id="enddate"
              name="enddate"
              value={updatedEvent.enddate}
              onChange={handleInputChange}
              placeholder="End Date (yyyy-mm-dd)"
            />
            <label htmlFor="status" style={{ fontWeight: 'bold' }}>Status:</label>
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="contained" color="primary" onClick={updateEvent}>
              Update
            </Button>
            <Button variant="contained" color="secondary" style={{ background: "#D0312D" }} onClick={deleteEvent}>
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
