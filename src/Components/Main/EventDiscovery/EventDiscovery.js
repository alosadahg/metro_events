import EventFilters from "./EventFilters";
import Thumbnail from "./Thumbnail";
import Modal from "../../Modal/Modal";
import { useContext } from "react";
import { EventContext } from "../../../Context/EventContext";

const EventDiscovery = () => {
  const [data] = useContext(EventContext);

  console.log(data);
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
          {data.map((item, i) => (
            <Thumbnail
              key={i}
              thumbnail={item.thumbnail}
              date={item.startdate}
              title={item.eventname}
              description={item.description}
            />
          ))}
        </div>
      </div>

      <Modal />
    </div>
  );
};

export default EventDiscovery;
