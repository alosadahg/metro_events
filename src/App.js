import React, { useState } from "react";
import "./Styles/App.scss";
import Header from "./Components/Common/Header";
import PictureBox from "./Components/Main/PictureBox/PictureBox";
import EventDiscovery from "./Components/Main/EventDiscovery/EventDiscovery";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Dashboard from "./Components/UserManagement/Dashboard.js";
import Login from "./Components/UserManagement/Login.js";
import Registration from "./Components/UserManagement/Registration.js";
import DashboardAdmin from "./Components/DashboardAdmin/DashboardAdmin.js";
=======
import Dashboard from "./Components/Dashboard.js";
import Login from "./Components/Login.js";
import Registration from "./Components/Registration.js";
import LandingPage from "./Components/Main/LandingPage/LandingPage.js";
>>>>>>> 49c913d3fd4236443b5e9163cbb00d0d1e06ccd2

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
<<<<<<< HEAD
        <Routes>x``
=======
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
>>>>>>> 49c913d3fd4236443b5e9163cbb00d0d1e06ccd2
          <Route
            path="/event-discovery"
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
<<<<<<< HEAD
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/dashboardadmin" element={<DashboardAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
=======
>>>>>>> 49c913d3fd4236443b5e9163cbb00d0d1e06ccd2
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
