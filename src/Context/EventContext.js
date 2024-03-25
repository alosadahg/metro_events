import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});
  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <EventContext.Provider
      value={{ data, currentEvent, setCurrentEvent, setCurrentEventIndex }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
