import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./LoginContext";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});
  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [myEvents, setMyEvents] = useState([]);
  const { userData } = useContext(UserContext);

  // console.log(userData);

  console.log(myEvents);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://events-api-iuta.onrender.com/event/view-all"
        );
        setData(response.data);
        // console.log(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
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
    fetchMyEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        data,
        currentEvent,
        setCurrentEvent,
        setCurrentEventIndex,
        myEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
