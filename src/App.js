import React from "react";
import "./Styles/App.scss";
import Header from "./Components/Common/Header";
import PictureBox from "./Components/Main/PictureBox/PictureBox";
import EventDiscovery from "./Components/Main/EventDiscovery/EventDiscovery";

const App = () => {
  return (
    <div className="App">
      <Header />

      <main>
        {/* note: main tag has zero padding/margin */}
        <PictureBox />
        <EventDiscovery /> {/*only if user not admi/organizer*/}
      </main>
    </div>
  );
};

export default App;
