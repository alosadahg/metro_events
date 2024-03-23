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
  const [isAuth, setIsAuth] = useState(true);
  return (
    <div className="App">
      {isAuth && <Header />}
      {isAuth && (
        <main style={{ marginTop: `${!isAuth && "0px !important"}` }}>
          {/* note: main tag has zero padding/margin */}
          <PictureBox />
          <EventDiscovery /> {/*only if user not admi/organizer*/}
        </main>
      )}

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
