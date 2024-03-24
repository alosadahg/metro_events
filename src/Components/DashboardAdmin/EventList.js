import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Splashscreen from '../Common/Splashscreen';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://events-api-iuta.onrender.com/event/view-all");
        setEvents(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <div style={{ position: 'relative' }}>
          <div className="overlay">
            <Splashscreen />
          </div>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', opacity: isLoading ? 0.5 : 1 }}>
            {events.map((event) => (
              <Card key={event.id} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt={event.title}
                  height="140"
                  image={event.imageUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Update</Button>
                  <Button size="small">Delete</Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default EventList;