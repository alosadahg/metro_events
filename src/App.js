import React, { useState } from "react";
import "./Styles/App.scss";
import Header from "./Components/Common/Header";
import PictureBox from "./Components/Main/PictureBox/PictureBox";
import EventDiscovery from "./Components/Main/EventDiscovery/EventDiscovery";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard.js";
import Login from "./Components/Login.js";
import Registration from "./Components/Registration.js";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <main>
                  {/* note: main tag has zero padding/margin */}
                  <PictureBox />
                  <EventDiscovery /> {/*only if user not admi/organizer*/}
                </main>
              </>
            }
          />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
