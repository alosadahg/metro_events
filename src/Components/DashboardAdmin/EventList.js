import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Splashscreen from '../Common/Splashscreen';
import axios from 'axios';
import UpdateDeleteEventsModal from '../Modal/UpdateDeleteEventsModal';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://events-api-iuta.onrender.com/event/view-all");
        setEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
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
      // Update local events state
      if (response.status === 200) {
        setEvents((prevEvents) =>
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
          setEvents((prevEvents) =>
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
    <React.Fragment>
      {isLoading ? (
        <div style={{ position: 'relative' }}>
          <div className="overlay">
            <Splashscreen />
          </div>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', opacity: isLoading ? 0.5 : 1 }}>
            {events.map((event) => (
              <Card key={event.id} sx={{ width: 330 }}>
                <CardMedia
                  component="img"
                  alt={event.eventname}
                  height="140"
                  image={event.thumbnail}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.eventname}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {event.startdate} - {event.enddate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {event.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {event.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Participants: {event.participants ? event.participants : 0} 
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => openForm(event)}>Edit</Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      )}

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
    </React.Fragment>
  );
}

export default EventList;