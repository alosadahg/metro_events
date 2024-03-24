import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import OrganizerRequest from './OrganizerRequest.js';
import Grid from '@mui/material/Grid';
import IconBreadcrumbs from './IconBreadcrumbs.js';
import EventList from './EventList.js';
import UserList from './UserList.js';


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
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center', mb: 3 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
      </Paper>
      <IconBreadcrumbs setDisplayRequest={setDisplayRequest} setDisplayEvents={setDisplayEvents} setUserClick={setUserClick} />
      {displayEvents && <EventList />}
      {displayRequest && <OrganizerRequests />}
      {userClick && <UserList />}
    </Container>
  );
}

export default DashboardAdmin;
