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
import LoggedUserProvider from "./Context/LoginContext.js";

const App = () => {
  return (
    <div className="App">
      <ModalProvider>
        <LoggedUserProvider>
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
                    <EventProvider>
                      <Header />
                      <main>
                        {/* note: main tag has zero padding/margin */}
                        <PictureBox />
                        <EventDiscovery /> {/*only if user not admi/organizer*/}
                      </main>
                    </EventProvider>
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </LoggedUserProvider>
      </ModalProvider>
    </div>
  );
};

export default App;
