import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import OrganizerRequest from './OrganizerRequest';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://events-api-iuta.onrender.com/user/view-all"
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <h3>Users</h3>
              <OrganizerRequest parent={'user'} arr={userData}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  export default UserList;

