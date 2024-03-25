import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Splashscreen from '../Common/Splashscreen';
import UpdateUserForm from './UpdateUserForm';

export default function OrganizerRequest(props) {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://events-api-iuta.onrender.com/user/view-all"
        );
        setRows(response.data);
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false); 
      }
    };

    fetchUserData();
  }, [rows]);

  let filteredRows = rows; 

  if (props.parent === 'org') {
    filteredRows = rows.filter(row => row.user_type === 'pending');
  }

  const handleApprove = async (email) => {
    try {
      setIsLoading(true);
      const response = await axios.put( 
        "https://events-api-iuta.onrender.com/user/update-status",
        {
          email: email,
          status: "organizer"
        },
        {
          headers: {  
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (row) => {
    setSelectedRow(row); 
    setIsFormOpen(true);
  };

  const handleDelete = async (row) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        "https://events-api-iuta.onrender.com/user/update-status",
        {
          uid: row.uid,
          firstname: row.firstname,
          lastname: row.lastname,
          email: row.email,
          password: row.password
        },
        {
          headers: {  
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async(email) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        "https://events-api-iuta.onrender.com/user/update-status",
        {
          email: email,
          status: "user"
        },
        {
          headers: {  
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {isLoading ? ( 
        <div className="overlay">
          <Splashscreen />
        </div>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Firstname</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.uid}</TableCell>
                <TableCell>{row.firstname}</TableCell>
                <TableCell>{row.lastname}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>{row.user_type}</TableCell>
                {props.parent === 'org' && (
                  <TableCell align="center">
                    <Button variant="contained" color="primary" onClick={() => handleApprove(row.email)}>Approve</Button>
                    <span style={{ margin: '0 5px' }}></span> {/* Add a gap between buttons */}
                    <Button variant="contained" color="secondary" onClick={() => handleReject(row.email)}>Reject</Button>
                  </TableCell>
                )}
                {props.parent === 'user' && (
                  <TableCell align="center">
                    <Button variant="contained" color="primary" onClick={() => handleUpdate(row)}>Update</Button>
                    <span style={{ margin: '0 5px' }}></span> {/* Add a gap between buttons */}
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(row)}>Delete</Button>
                  </TableCell>
                )}
                {isFormOpen && (
                  <div className="overlay">
                    <UpdateUserForm row={selectedRow} onClose={() => setIsFormOpen(false)} /> 
                  </div>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
}
