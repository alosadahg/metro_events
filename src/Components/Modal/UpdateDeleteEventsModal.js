import React from 'react';
import { Modal, Box, Button, TextField, Grid } from '@mui/material';

const UpdateDeleteEventsModal = ({ isModalOpen, closeForm, updatedEvent, handleInputChange, updateEvent, deleteEvent }) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={closeForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ borderRadius: '10px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40%', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <form>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>Edit Event</h3>
            <TextField
              id="eventname"
              label="Event Name"
              value={updatedEvent.eventname}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              id="description"
              label="Description"
              value={updatedEvent.description}
              onChange={handleInputChange}
              multiline  // Set to true for multiline input
              rows={4}    // Adjust the number of visible rows as needed
              variant="outlined"
            />
            <TextField
              id="location"
              label="Location"
              value={updatedEvent.location}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              id="startdate"
              label="Start Date"
              value={updatedEvent.startdate}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              id="enddate"
              label="End Date"
              value={updatedEvent.enddate}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              id="status"
              label="Status"
              value={updatedEvent.status}
              onChange={handleInputChange}
              variant="outlined"
            />
          </div>
          <br />
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={updateEvent}>
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={deleteEvent} style={{ background: "#D0312D" }}>
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={closeForm}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

export default UpdateDeleteEventsModal;
