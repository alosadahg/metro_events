import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./LoginContext";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});
  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [myEvents, setMyEvents] = useState([]);
  const { userData } = useContext(UserContext);

  // console.log(userData);

  // console.log(myEvents);

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get(
        "https://events-api-iuta.onrender.com/event/view-all"
      );
      setAllEvents(response.data);
      // console.log(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyEvents = async () => {
    try {
      const response = await axios.get(
        "https://events-api-iuta.onrender.com/attend-event/view-all"
      );
      // console.log(response);

      let events = [];
      response.data.forEach((event) => {
        if (event.userid === userData.uid) {
          events.push(event);
        }
      });
      setMyEvents(events);
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <EventContext.Provider
      value={{
        allEvents,
        currentEvent,
        setCurrentEvent,
        setCurrentEventIndex,
        myEvents,
        fetchMyEvents,
        fetchAllEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
