import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/LoginContext";
import axios from "axios";
const ParticipantModal = ({ eventid, open, handleClose }) => {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [eventID, setEventID] = useState(eventid);

  useEffect(() => {
    setEventID(eventid);
  }, [eventid]);

  // console.log(userData);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user requests
        const userRequestsResponse = await axios.post(
          "https://events-api-iuta.onrender.com/attend-event/view-by-organizer",
          {
            organizer: userData.uid,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        // Filter user requests by event id
        const filteredUserRequests = userRequestsResponse.data.filter(
          (request) =>
            request.eventid === eventID && request.status === "interested"
        );

        // Fetch participants based on filtered user requests
        const participantsData = await Promise.all(
          filteredUserRequests.map(async (request) => {
            const userResponse = await axios.post(
              "https://events-api-iuta.onrender.com/user/view-by-id",
              {
                userid: request.userid,
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );
            return userResponse.data;
          })
        );

        setParticipants(participantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [eventID, open, userData.uid]);

  const approveInterestedParticipant = async (participant) => {
    try {
      const response = await axios.put(
        "https://events-api-iuta.onrender.com/attend-event/approved",
        {
          userid: participant,
          eventid: eventID,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      alert(userData.email + " is now approved to join the event.");
      console.log("Approved participant:", response.data);
      setLoading(true);
      setEventID(eventid);
    } catch (error) {
      console.error("Error approving participant:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle
        style={{
          backgroundColor: "#f0f0f0",
          color: "#333",
          padding: "20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        Interested Participants List
      </DialogTitle>
      <div style={{ padding: "20px" }}>
        <div style={{ padding: "20px" }}>
          {loading ? ( // Display loading indicator if data is being fetched
            <CircularProgress />
          ) : (
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "10px 0",
                      textAlign: "left",
                    }}
                  >
                    First Name
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "10px 0",
                      textAlign: "left",
                    }}
                  >
                    Last Name
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "10px 0",
                      textAlign: "left",
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "10px 0",
                      textAlign: "center",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {participants &&
                  participants.map((participant) => {
                    return (
                      <tr key={participant.uid}>
                        <td style={{ padding: "10px 0" }}>
                          {participant.firstname}
                        </td>
                        <td style={{ padding: "10px 0" }}>
                          {participant.lastname}
                        </td>
                        <td style={{ padding: "10px 0" }}>
                          {participant.email}
                        </td>
                        <td style={{ padding: "10px 0", textAlign: "center" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginRight: 10 }}
                            onClick={() => {
                              approveInterestedParticipant(participant.uid);
                            }}
                          >
                            Approve
                          </Button>
                        </td>
                      </tr>
                    );
                  })}

                {/* Add more participant rows as needed */}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <DialogActions
        style={{
          borderTop: "1px solid #ccc",
          padding: "20px",
          justifyContent: "flex-end",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParticipantModal;
