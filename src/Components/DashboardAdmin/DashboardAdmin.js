import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconBreadcrumbs from './IconBreadcrumbs.js';
import EventList from './EventList.js';
import UserList from './UserList.js';
import OrganizerRequest from './OrganizerRequest.js';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const OrganizerRequests = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <h3>Organizer Requests</h3>
            <OrganizerRequest parent={'org'}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const DashboardAdmin = () => {
  const [displayRequest, setDisplayRequest] = useState(false);
  const [displayEvents, setDisplayEvents] = useState(true); 
  const [userClick, setUserClick] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleLogout = () => {
    // Here you can implement your logout logic, such as clearing authentication tokens or session data
    // For demonstration purposes, let's clear a hypothetical token and redirect to the login page
    localStorage.removeItem('authToken'); // Clear authentication token from local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center', mb: 3, backgroundColor: "#455a71", color: "#FFFFFF", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button variant="contained" color="secondary" sx={{backgroundColor: "#455a71"}} onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
      <IconBreadcrumbs setDisplayRequest={setDisplayRequest} setDisplayEvents={setDisplayEvents} setUserClick={setUserClick} />
      {displayEvents && <EventList />}
      {displayRequest && <OrganizerRequests />}
      {userClick && <UserList />}
    </Container>
  );
}

export default DashboardAdmin;
