import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import ParticipantModal from "../../Modal/ParticipantModal";
import CreateEventModal from "../../Modal/CreateEventModal";
import SettingsIcon from "@mui/icons-material/Settings";
import { UserContext } from "../../../Context/LoginContext";
import { EventContext } from "../../../Context/EventContext";
import axios from "axios";
import UpdateDeleteEventsModal from '../../Modal/UpdateDeleteEventsModal'; // Import UpdateDeleteEventsModal

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showParticipantModal, setShowParticipantModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [organizerEvents, setOrganizerEvents] = useState([]);
  const { allEvents, fetchAllEvents } = useContext(EventContext);
  const { userData } = useContext(UserContext);
  const [eventid, setEventID] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    eid: '',
    eventname: '',
    organizer: '',
    description: '',
    location: '',
    startdate: '',
    enddate: '',
    status: '',
    thumbnail: ''
  });

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

  const openForm = (event) => {
    setSelectedEvent(event);
    // Ensure the state is properly set for the selected event, including its id
    setUpdatedEvent({ ...event, id: event.id });
    setIsModalOpen(true);
  };

  const closeForm = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const updateEvent = async () => {
    try {
      setIsLoading(true);
      console.log("Updating event:", updatedEvent);
  
      const requestBody = {
        eid: updatedEvent.eid,
        eventname: updatedEvent.eventname,
        organizer: updatedEvent.organizer,
        description: updatedEvent.description,
        location: updatedEvent.location,
        startdate: updatedEvent.startdate,
        enddate: updatedEvent.enddate,
        status: updatedEvent.status,
        thumbnail: updatedEvent.thumbnail
      };
  
      const response = await axios.put(
        "https://events-api-iuta.onrender.com/event/update-event-info",
        requestBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
  
      console.log("Update Event Response:", response.data);
  
      if (response.status === 200) {
        // Update local events state with the updated event
        setOrganizerEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.eid === updatedEvent.eid ? { ...event, ...updatedEvent } : event
          )
        );
        closeForm();
      } else {
        console.log("Failed to update event.");
        alert("Failed to update event. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteEvent = async () => {
    try {
      setIsLoading(true);
      if (selectedEvent) {
        const requestBody = {
          eventid: selectedEvent.eid,
        };
  
        console.log("Request Body:", requestBody);
  
        const response = await axios.delete(
          "https://events-api-iuta.onrender.com/event/delete",
          {
            headers: {
              "Content-Type": "application/json"
            },
            params: requestBody 
          }
        );
  
        console.log("Delete Event Response:", response.data);
  
        if (response.data === 1) {
          console.log("Event successfully deleted from the database.");
          // Update local events state by filtering out the deleted event
          setOrganizerEvents((prevEvents) =>
            prevEvents.filter((event) => event.eid !== selectedEvent.eid)
          );
          closeForm();
        } else {
          console.log("Failed to delete event from the database.");
          alert("Failed to delete event from the database.");
        }
      } else {
        console.error("No event selected for deletion");
        alert("No event selected for deletion");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };  

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
                      onClick={() => {
                        setEventID(event.eid);
                        handleParticipantModalOpen();
                      }}
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
                      onClick={() => openForm(event)} // Open modal on button click
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
        eventid={eventid}
        open={showParticipantModal}
        handleClose={handleParticipantModalClose}
      />

      <CreateEventModal
        open={showCreateEventModal}
        handleClose={handleCreateEventModalClose}
      />

      {/* Modal for updating and deleting events */}
      <UpdateDeleteEventsModal
        isModalOpen={isModalOpen}
        closeForm={closeForm}
        updatedEvent={updatedEvent}
        handleInputChange={handleInputChange}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};

export default OrganizerDashboard;
