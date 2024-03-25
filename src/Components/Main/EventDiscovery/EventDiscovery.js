import EventFilters from "./EventFilters";
import Thumbnail from "./Thumbnail";
import bike from "../../../Assets/bike.jpg";
import Modal from "../../Modal/Modal";

const EventDiscovery = () => {
  const data = [
    {
      date: "03/23/2024",
      title: "Fucking title",
      description:
        "Embark on an adrenaline-pumping journey through rugged landscapes and untamed trails in our thrilling trail biking event, Wild Trails Adventure: Conquer the Terrain! Get ready to push your limits, test your skills, and experience the rush of conquering nature's challenges on two wheels.",
    },
    {
      date: "03/23/2024",
      title: "Fucking title",
      description:
        "Embark on an adrenaline-pumping journey through rugged landscapes and untamed trails in our thrilling trail biking event, Wild Trails Adventure: Conquer the Terrain! Get ready to push your limits, test your skills, and experience the rush of conquering nature's challenges on two wheels.",
    },
    {
      date: "03/23/2024",
      title: "Fucking title",
      description:
        "Embark on an adrenaline-pumping journey through rugged landscapes and untamed trails in our thrilling trail biking event, Wild Trails Adventure: Conquer the Terrain! Get ready to push your limits, test your skills, and experience the rush of conquering nature's challenges on two wheels.",
    },
    {
      date: "03/23/2024",
      title: "Fucking title",
      description:
        "Embark on an adrenaline-pumping journey through rugged landscapes and untamed trails in our thrilling trail biking event, Wild Trails Adventure: Conquer the Terrain! Get ready to push your limits, test your skills, and experience the rush of conquering nature's challenges on two wheels.",
    },
    {
      date: "03/23/2024",
      title: "Fucking title",
      description:
        "Embark on an adrenaline-pumping journey through rugged landscapes and untamed trails in our thrilling trail biking event, Wild Trails Adventure: Conquer the Terrain! Get ready to push your limits, test your skills, and experience the rush of conquering nature's challenges on two wheels.",
    },
    {
      date: "03/23/2024",
      title: "Fucking title",
      description:
        "Embark on an adrenaline-pumping journey through rugged landscapes and untamed trails in our thrilling trail biking event, Wild Trails Adventure: Conquer the Terrain! Get ready to push your limits, test your skills, and experience the rush of conquering nature's challenges on two wheels.",
    },
  ];

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
              thumbnail={bike}
              date={item.date}
              title={item.title}
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
