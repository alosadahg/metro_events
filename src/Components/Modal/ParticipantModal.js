import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const ParticipantModal = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '10px',
        }
      }}
    >
      <DialogTitle style={{ backgroundColor: "#f0f0f0", color: "#333", padding: "20px", borderBottom: "1px solid #ccc" }}>
        Interested Participants List
      </DialogTitle>
      <div style={{ padding: "20px" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "10px 0", textAlign: "left" }}>First Name</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "10px 0", textAlign: "left" }}>Last Name</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "10px 0", textAlign: "left" }}>Email</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "10px 0", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px 0" }}>-</td>
              <td style={{ padding: "10px 0" }}>-</td>
              <td style={{ padding: "10px 0" }}>-</td>
              <td style={{ padding: "10px 0", textAlign: "center" }}>
                <Button variant="contained" color="primary" style={{ marginRight: 10 }}>Approve</Button>
                <Button variant="contained" color="secondary" style={{ background:'#D0312D' }}>Decline</Button>
              </td>
            </tr>
            {/* Add more participant rows as needed */}
          </tbody>
        </table>
      </div>
      <DialogActions style={{ borderTop: "1px solid #ccc", padding: "20px", justifyContent: "flex-end", backgroundColor: "#f0f0f0" }}>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParticipantModal;
