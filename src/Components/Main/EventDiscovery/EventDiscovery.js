import EventFilters from "./EventFilters";
import Thumbnail from "./Thumbnail";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "../../../Context/EventContext";

const EventDiscovery = () => {
  const { allEvents } = useContext(EventContext);
  const { fetchMyEvents, fetchAllEvents } = useContext(EventContext);
  const [sortedEvents, setSortedEvents] = useState([]);

  useEffect(() => {
    console.log("Fetching events");
    fetchMyEvents();
    fetchAllEvents();
  }, []);

  useEffect(() => {
    setSortedEvents(allEvents.sort((a, b) => b.upvotes - a.upvotes));
  }, [allEvents]);

  return (
    <div className="EventDiscovery">
      <nav>
        <h2>Event Discovery</h2>

        <ul className="event-categories">
          <li className="active">Trail Biking</li>
          <li>Basketball Games</li>
          <li>Zumba Sessions</li>
        </ul>
      </nav>

      <div className="Browse">
        <EventFilters />
        <div className="Thumbnails">
          {sortedEvents.map((item, i) => (
            <Thumbnail
              key={i}
              thumbnail={item.thumbnail}
              date={item.startdate}
              title={item.eventname}
              description={item.description}
              event={item}
              upvotes={item.upvotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDiscovery;
