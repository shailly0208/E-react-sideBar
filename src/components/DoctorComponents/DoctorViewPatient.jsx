import React, { useState } from 'react';
import { Modal, Box, Button, Typography, Card, CardContent, TextField, Grid, List, ListItem, ListItemIcon, Paper, Snackbar  } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import FloatingChatWindow from '../FloatingChatWindow';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import { PatientMedicalHistory } from './PatientMedicalHistory';

export function DoctorViewPatient({ open, onClose, patientId, doctorId }) {


  // State Initialization
  const [patientData, setPatientData] = React.useState({});
  const [treatments, setTreatments] = React.useState([]);
  const [loginStatus, setLoginStatus] = React.useState();
  const [notes, setNotes] = React.useState(
    'The patient reports feeling tired in the evenings. Recommend a follow-up appointment.'
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [showPastVisitsModal, setShowPastVisitsModal] = useState(false);
  const [pastVisits, setPastVisits] = useState([]);

  const [showMedicalHistoryModal, setShowMedicalHistoryModal] = useState(false);
  const toggleMedicalHistoryModal = () => {
    setShowMedicalHistoryModal(!showMedicalHistoryModal);
};



  const columns = [
    { field: 'date', headerName: 'Date', flex:1 },
    { field: 'reason_for_visit', headerName: 'Reason', flex: 1 },
    { field: 'observations', headerName: 'Observations', flex: 2 },
    // Add other relevant columns here
  ];

    // Function to fetch past visits
    const fetchPastVisits = async () => {
      try {
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/patientVisits', { doctorId, patientId });
        console.log(response)
        //const { data } = response;
        //setPastVisits(data)
        const transformedData = response.data.map((item, index) => ({
          id: index, // Ensure each row has an 'id' field
          ...item,
        }));
        setPastVisits(transformedData);
      } catch (error) {
        console.error('Error fetching past visits:', error);
      }
    };

  const handlePastVisits= async () =>{
    await fetchPastVisits();
    setShowPastVisitsModal(true);
  }
  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    minHeight: '100%',
    bgcolor: 'rgba(25, 118, 210, 0.5)',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    overflowY: 'auto',
  };
  const style1 = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    minHeight: '100%',
    boxShadow: 24,
    pt: 2,
    pb: 3,
    overflowY: 'auto',
  };
  const styleMini = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    minHeight: '50%',
    pt: 2,
    px: 4,
    pb: 3,
    overflowY: 'auto',
  };
  // Fetch treatments function
  const fetchTreatments = async () => {
    try {
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/patientOverview', { patientId });
        if (response.data && response.data.treatments) {
            setTreatments(response.data.treatments);
        }
    } catch (error) {
        console.error('Error fetching treatments:', error);
    }
};
  //LocalTime
  const toLocalISOString = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split('T')[0];
  };
  // Function to format date in a display-friendly format
  const formatDateForDisplay = (isoDateString) => {
    const [datePart] = isoDateString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString();
  };

  const [showAddTreatmentModal, setShowAddTreatmentModal] = useState(false);
  const [treatmentDetails, setTreatmentDetails] = useState({
      treatment: '',
      date: toLocalISOString(new Date()),
      diseaseType: '',
      diseaseId: ''
  });
  const handleTreatmentChange = (e) => {
        setTreatmentDetails({ ...treatmentDetails, [e.target.name]: e.target.value });
    };

    const saveTreatment = async () => {
      try {
          const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/saveTreatment', {
              ...treatmentDetails,
              patientId,
              doctorId
          });
          console.log(response.data);
          // Refetch the treatments data
          fetchTreatments();
          setShowAddTreatmentModal(false);
      } catch (error) {
          console.error('Error saving treatment:', error);
      }
  };

   //state variables for form fields
   const [visitDate, setVisitDate] = useState(toLocalISOString(new Date()));
   const [startTime, setStartTime] = useState('');
   const [endTime, setEndTime] = useState('');
   const [reasonForVisit, setReasonForVisit] = useState('');
   // Function to handle saving the visit
  const saveVisit = async () => {
    const visitDetails = {
      doctorId,
      patientId,
      visitDate,
      startTime,
      endTime,
      reasonForVisit,
      notes, // observations
    };
    try {
       //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
        //http://localhost:8080/
      const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/saveVisit', visitDetails);
      console.log(response.data);
      setSnackbarMessage('Visit logged successfully!');
      setSnackbarOpen(true);
      setStartTime('');
      setEndTime('');
      setReasonForVisit('');
    } catch (error) {
      console.error('Error saving visit:', error);
      // Handle error
    }
  };
  const [windowOpen, setwindowOpen] = useState(false);

  const toggleChatWindow = () => {
    setwindowOpen(!windowOpen);
  };
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  useEffect(() => {
    const getData = async () => {
      try {
        //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
        //http://localhost:8080/
        const response = await axios.post(
          'https://e-react-node-backend-22ed6864d5f3.herokuapp.com/patientOverview',
          {
            patientId,
          }
        );
        const { data } = response;
        if (data.error) {
          console.log(JSON.stringify(data.error));
          console.log('error');
        } else {
          setPatientData(data.patient_data);
          setTreatments(data.treatments);
          setLoginStatus(data.status);
        }
      } catch (error) {
        console.log(
          `Error With request getting top 5 recent: ${error.message}`
        );
      }
    };
    getData();
  }, [patientId]);

  const handleOpenNewTab = (path) => {
    const url = window.location.origin + path;
    window.open(url, '_blank');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Button
          variant='contained'
          color='primary'
          onClick={onClose}
          sx={{ position: 'absolute', top: 30, right: 80 }}
        >
          Close
        </Button>

        <Card>
          <CardContent>
            <Typography variant='h4' component='div' align='center'>
              <div
                style={{
                  height: '20px',
                  width: '20px',
                  backgroundColor: loginStatus === 'active' ? 'green' : 'gray',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '10px',
                  verticalAlign: 'middle',
                }}
              />
              {patientData.FName} {patientData.LName}
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant='h6'><strong>Personal Information</strong></Typography>
                  <Typography variant='body1'>
                    First Name: <em> {patientData.FName} </em>
                  </Typography>
                  <Typography variant='body1'>
                    Middle Name: <em>{patientData.MName} </em>
                  </Typography>
                  <Typography variant='body1'>
                    Last Name: <em> {patientData.LName} </em>
                  </Typography>
                  <Typography variant='body1'>
                    Address: <em> {patientData.Address} </em>
                  </Typography>
                  <Typography variant='body1'>
                    Phone: <em> {patientData.MobileNumber} </em>
                  </Typography>
                  <Typography variant='body1'>
                    Email: <em> {patientData.EmailId} </em>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant='h6'><strong>Demographics</strong></Typography>
                  <Typography variant='body1'>
                    Age:<em> {patientData.Age} </em>
                  </Typography>
                  <Typography variant='body1'>
                    Gender: <em> {patientData.Gender} </em>
                  </Typography>
                  <Typography variant='body1'>
                    Blood Type:<em> {patientData.BloodGrood}</em>
                  </Typography>
                  <Typography variant='body1'>
                    Height: <em> {patientData.height} cm </em>
                  </Typography>
                  <Typography variant='body1'>
                    Weight: <em>{patientData.weight} kg </em>
                  </Typography>
                  <Typography variant='body1'>
                    Race: <em> {patientData.race} </em>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant='h6'>Records</Typography>
                      <Button fullWidth onClick={toggleMedicalHistoryModal}>
                        View Medical History 
                      </Button>
                        {/* Nested Modal for Medical History */}
                        <Modal open={showMedicalHistoryModal} onClose={toggleMedicalHistoryModal}>
                          <Box sx={style1}>
                            <Card sx={{width:'100%'}}>
                               {/* Your modal content here */}
                               <PatientMedicalHistory patientId={patientId} />
                               <Button variant='outlined' onClick={toggleMedicalHistoryModal} sx={{ position: 'absolute', top: '80%', right: '50%'} }>Exit</Button>
                            </Card>
                          </Box>
                      </Modal>
                      <Typography variant='h6'>Visits</Typography>
                      <Button fullWidth onClick={() =>handlePastVisits() }>View Logged Visits</Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant='h6'>Actions</Typography>
                      <Button
                        variant='contained'
                        fullWidth
                        sx={{ mt: 2 }}
                        component={Link}
                        to='/searchresult'
                        state={patientData}
                      >
                        View Diagnosis
                      </Button>
                      <Button
                        variant='contained'
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() =>
                          handleOpenNewTab(
                            `/DoctorVideo?doctorID=${doctorId}&patientID=${patientId}`
                          )
                        }
                      >
                        Video Call
                      </Button>
                      <Button variant='contained' fullWidth sx={{ mt: 2 }}>
                        Voice Recognition
                      </Button>
                      <Button variant='contained' fullWidth sx={{ mt: 2 }}>
                        Send Message
                      </Button>
                      <div>
                        <Button
                          variant='contained'
                          fullWidth
                          sx={{ mt: 2 }}
                          onClick={toggleChatWindow}
                        >
                          Live Text Chat
                        </Button>
                        {windowOpen && (
                          <FloatingChatWindow
                            patientId={patientId}
                            doctorId={doctorId}
                            identity='doctor'
                            closeChat={toggleChatWindow}
                          />
                        )}
                      </div>
                      <Button
                        variant='contained'
                        fullWidth={true}
                        sx={{ mt: 2 }}
                        component={Link}
                        to='/Chatbot'
                      >
                        Chatbot
                      </Button>
                      <Button
                        variant='contained'
                        fullWidth={true}
                        sx={{ mt: 2 }}
                        component={Link}
                        to='/contact'
                      >
                        Contact Staff
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>


                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant='h6'>Log Visit</Typography>
                      <TextField
                        label="Date of Visit"
                        type="date"
                        value={visitDate}
                        onChange={(e)=>setVisitDate(e.target.value)}
                        sx={{ width: '100%', mt: 2 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant='standard'
                      />
                      <TextField
                        label="Start Time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        sx={{ width: '50%' }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant='standard'
                        required
                      />
                       <TextField
                        label="End Time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        sx={{ width: '50%' }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant='standard'
                        required
                      />
                      <TextField
                        label="Reason for Visit"
                        value={reasonForVisit}
                        onChange={(e) => setReasonForVisit(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="standard"
                        required
                      />
                        {/* Observations */}
                          <TextField
                            label="Observations"
                            multiline
                            rows={4}
                            value={notes}
                            onChange={handleNotesChange}
                            variant="standard"
                            fullWidth
                            margin="normal"
                          />
                       
                      <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={saveVisit}
                      >
                        Save Visit
                      </Button>
                      <Snackbar 
                         anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                         open={snackbarOpen}
                         autoHideDuration={6000}
                         onClose={handleSnackbarClose}
                         message={snackbarMessage}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant='h6'>Latest Treatments</Typography>
                      <Button fullWidth  onClick={() => setShowAddTreatmentModal(true)}> Add Treatment</Button>
                      {/* Add Treatment Modal */}
                      <Modal  open={showAddTreatmentModal} onClose={() => setShowAddTreatmentModal(false)}>
                          <Box sx={styleMini}>
                              <Card>
                                  <CardContent>
                                      <Typography variant='h6'>Add Treatment</Typography>
                                      <TextField
                                          label="Treatment"
                                          name="treatment"
                                          value={treatmentDetails.treatment}
                                          onChange={handleTreatmentChange}
                                          fullWidth
                                          sx={{ mt: 2 }}
                                      />
                                      <TextField
                                          label="Date of Treatment"
                                          name="date"
                                          type="date"
                                          value={treatmentDetails.date}
                                          onChange={handleTreatmentChange}
                                          fullWidth
                                          InputLabelProps={{ shrink: true }}
                                          sx={{ mt: 2 }}
                                      />
                                      <TextField
                                          label="Disease Type"
                                          name="diseaseType"
                                          value={treatmentDetails.diseaseType}
                                          onChange={handleTreatmentChange}
                                          fullWidth
                                          sx={{ mt: 2 }}
                                      />
                                      <TextField
                                          label="Disease ID"
                                          name="diseaseId"
                                          value={treatmentDetails.diseaseId}
                                          onChange={handleTreatmentChange}
                                          fullWidth
                                          sx={{ mt: 2 }}
                                      />
                                      <Button
                                          variant='contained'
                                          color='primary'
                                          onClick={saveTreatment}
                                          sx={{ mt: 2 }}
                                      >
                                          Save Treatment
                                      </Button>
                                  </CardContent>
                              </Card>
                          </Box>
                      </Modal>
                      {treatments.length > 0 ? (
                        <List style={{ maxHeight: '200px', overflowY: 'auto' }}>
                          {treatments.map((treatment, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <MedicationIcon />
                              </ListItemIcon>
                              <Typography variant='body1'>
                                {treatment.treatment} - {formatDateForDisplay(treatment.RecordDate)}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant='body1' sx={{ mt: 2 }}>
                          No Treatments Found...
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </CardContent>
        </Card>
           {/* Past Visits Modal */}
      <Modal open={showPastVisitsModal} onClose={() => setShowPastVisitsModal(false)}>
        <Box sx={styleMini}>
          <Card>
            <CardContent>
              <Typography variant='h6'>Past Visits</Typography>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={pastVisits}
                  columns={columns}
                  pageSize={5}
                />
              </div>
              <Button variant='contained' onClick={() => setShowPastVisitsModal(false)}>Close</Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
      </Box>
   
      
    </Modal>
  );
}
