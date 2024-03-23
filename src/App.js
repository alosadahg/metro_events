import React from "react";
import "./Styles/App.scss";
import Header from "./Components/Common/Header";
import PictureBox from "./Components/Main/PictureBox/PictureBox";
import EventDiscovery from "./Components/Main/EventDiscovery/EventDiscovery";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.js";
import Login from "./Login.js";
import Registration from "./Registration.js";

const App = () => {
  return (
    <div className="App">
      <Header />

      <main>
        {/* note: main tag has zero padding/margin */}
        <PictureBox />
        <EventDiscovery /> {/*only if user not admi/organizer*/}
      </main>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
