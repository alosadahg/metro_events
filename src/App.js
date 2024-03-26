import "./Styles/App.scss";
import Header from "./Components/Common/Header";
import PictureBox from "./Components/Main/PictureBox/PictureBox";
import EventDiscovery from "./Components/Main/EventDiscovery/EventDiscovery";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/UserManagement/Dashboard.js";
import Login from "./Components/UserManagement/Login.js";
import Registration from "./Components/UserManagement/Registration.js";
import DashboardAdmin from "./Components/DashboardAdmin/DashboardAdmin.js";
import LandingPage from "./Components/Main/LandingPage/LandingPage.js";
import ModalProvider from "./Context/ModalContext.js";
import EventProvider from "./Context/EventContext.js";
import LoggedUserProvider, { UserContext } from "./Context/LoginContext.js";
import ExpandedEvent from "./Components/Main/ExpandedEvent/ExpandedEvent";
import { useContext } from "react";
import JoinedEvents from "./Components/Main/JoinedEvents/JoinedEvents.js";
import Modal from "./Components/Modal/Modal";
import EventReminders from "./Components/Main/EventReminders/EventReminders.js";
import EventReviews from "./Components/Main/EventReviews/EventReviews.js";

const App = () => {
  return (
    <div className="App">
      <ModalProvider>
        <LoggedUserProvider>
          <EventProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboardadmin" element={<DashboardAdmin />} />
                <Route path="/dashboard/:userId" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />

                <Route
                  path="/event-discovery/:userID"
                  // path="/event-discovery"
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
                <Route
                  path="/expanded-event/:eventID"
                  element={
                    <>
                      <Header />

                      <main>
                        <ExpandedEvent />
                      </main>
                    </>
                  }
                />
                <Route
                  path="/joined-events"
                  element={
                    <>
                      <Header />

                      <main>
                        <JoinedEvents />
                      </main>
                    </>
                  }
                />
              </Routes>
              <Modal />
              <EventReminders />
            </BrowserRouter>
          </EventProvider>
        </LoggedUserProvider>
      </ModalProvider>
    </div>
  );
};

export default App;
