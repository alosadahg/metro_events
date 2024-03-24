import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const IconBreadcrumbs = ({ setDisplayRequest, setDisplayEvents, setUserClick }) => {

    const handleUserClick = () => {
      setUserClick(true);
      setDisplayRequest(false);
      setDisplayEvents(false);
    }
  
    const handleRequestClick = () => {
      setDisplayRequest(true);
      setDisplayEvents(false);
      setUserClick(false);
    }
  
    const handleEventsClick = () => {
      setDisplayRequest(false);
      setDisplayEvents(true);
      setUserClick(false);
    }
  
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/dashboardadmin"
            onClick={handleEventsClick}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Events
          </Link>
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            onClick={handleRequestClick}
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Organizer Requests
          </Link>
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            onClick={handleUserClick}
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            User List
          </Link>
        </Breadcrumbs>
      </div>
    );
  }

  export  default IconBreadcrumbs;