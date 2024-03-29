import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { UserContext } from "../../Context/LoginContext";
import axios from "axios";
import { EventContext } from "../../Context/EventContext";

const CreateEventModal = ({ open, handleClose, onCreateEvent }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { userData } = useContext(UserContext);
  const { fetchAllEvents, fetchMyEvents } = useContext(EventContext);

  // Function to handle form submission
  const handleSubmit = () => {
    // Logic to handle form submission (e.g., sending data to server)
    console.log("Form submitted:", {
      eventName,
      description,
      location,
      startDate,
      endDate,
      imageUrl,
    });
    // Close the modal after form submission
    const submitEvent = async () => {
      try {
        const response = await axios.post(
          "https://events-api-iuta.onrender.com/event/add",
          {
            eventname: eventName,
            organizer: userData.uid,
            description: description,
            location: location,
            startdate: startDate,
            enddate: endDate,
            status: "upcoming",
            thumbnail: imageUrl,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        console.log(response.data);
        onCreateEvent(response.data);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    };

    if (
      eventName.length > 0 &&
      description.length > 0 &&
      location.length > 0 &&
      startDate.length > 0 &&
      endDate.length > 0 &&
      imageUrl.length > 0
    ) {
      console.log("all fields filled");
      submitEvent();
      fetchMyEvents();
      fetchAllEvents();
    } else {
      alert("Please fill in all fields");
      return;
    }

    handleClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    // Pad single digits with a leading zero
    month = month.length === 1 ? "0" + month : month;
    day = day.length === 1 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle fontSize={25}>Create Event</DialogTitle>
      <DialogContent>
        {/* Form fields */}
        <TextField
          autoFocus
          margin="dense"
          label="Event Name"
          type="text"
          fullWidth
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4} // Adjust the number of visible rows as needed
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Location"
          type="text"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Start Date"
          type="date"
          fullWidth
          value={startDate}
          onChange={(e) => {
            setStartDate(formatDate(e.target.value));
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          label="End Date"
          type="date"
          fullWidth
          value={endDate}
          onChange={(e) => {
            setEndDate(formatDate(e.target.value));
          }}
          InputLabelProps={{
            shrink: true,
            placeholder: "yyyy-mm-dd",
          }}
        />
        <TextField
          margin="dense"
          label="Image URL"
          type="text"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {/* Display selected image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Event"
            style={{ marginTop: "10px", maxWidth: "100%" }}
          />
        )}
      </DialogContent>
      <DialogActions>
        {/* Buttons for form actions */}
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
        <Button
          onClick={() => {
            setImageUrl("");
            handleClose();
          }}
          variant="contained"
          color="primary"
          style={{ background: "#D0312D" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventModal;
