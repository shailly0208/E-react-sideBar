import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography, Card, CardContent, Grid, List, ListItem, ListItemText } from '@mui/material';import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { PatientRecordView } from './PatientRecordView';
export function PatientMedicalHistory({ patientId }) {
    const [openRecordModal, setOpenRecordModal] = useState(false);
    const [currentRecordData, setCurrentRecordData] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState({
        total_records: {},
        physical_test_cad: [],
        physical_test_ckd: [],
        physical_test_hd: [],
        physical_test_ms: [],
        vaccines: [],
        bloodtests: [],
        ecg: [],
        eye_test: [],
        tumor: []
    });

    useEffect(() => {
        const fetchMedicalHistory = async () => {
            try {
                const response = await axios.post('http://localhost:8080/patientMedicalHistory', { patientId });
                setMedicalHistory(response.data);
            } catch (error) {
                console.error('Error fetching medical history:', error);
            }
        };

        fetchMedicalHistory();
    }, [patientId]);


    const columnsForVaccines = [
      { field: 'id', headerName: 'ID', flex:0.5 },
      { field: 'disease_type', headerName: 'Disease Type', flex:1 },
      { field: 'Vaxx Status', headerName: 'Status', flex:1 },
  ];
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
   // Function to handle viewing of specific test details
   const viewTestDetails = (testType) => {
      // Set the current data based on test type
      let data;
      switch (testType) {
          case 'CAD':
              data = medicalHistory.physical_test_cad;
              break;
          case 'CKD':
              data = medicalHistory.physical_test_ckd;
              break;
          case 'HD':
               data = medicalHistory.physical_test_hd;
               break;
          case 'MS':
                  data = medicalHistory.physical_test_ms;
                  break;
          // ... handle other cases
      }
      setCurrentRecordData(data);
      setOpenRecordModal(true);
  };
     
    return (
        <Grid container spacing={2}>
         {/* Total Records */}
         <Grid item xs={12} sm={6} md={4}>
                <Card sx={{mt:2,mb:2}}>
                   <Typography variant='h4'>Total Records</Typography>
                    <CardContent sx={{ maxHeight: 300, overflow: 'auto' }}>
                        <List>
                            {Object.entries(medicalHistory.total_records).map(([key, value]) => (
                                <ListItem key={key}>
                                    <ListItemText primary={`${key.replace(/_/g, ' ')}: ${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>

            {/* Physical Tests */}
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant='h2'>Physical Tests</Typography>
                        {medicalHistory.physical_test_cad.length > 0 && (
                            <Button onClick={() => viewTestDetails('CAD')}>Physical Tests For CAD</Button>
                        )}
                        {medicalHistory.physical_test_ckd.length > 0 && (
                            <Button onClick={() => viewTestDetails('CKD')}>Physical Tests For CKD</Button>
                        )}
                        {medicalHistory.physical_test_hd.length > 0 && (
                            <Button onClick={() => viewTestDetails('HD')}>Physical Tests For Heart Disease</Button>
                        )}
                        {console.log('CAD tests length:', medicalHistory.physical_test_ms.length)} {/* Debug log */}
                        {medicalHistory.physical_test_ms.length > 0 && (
                            <Button onClick={() => viewTestDetails('MS')}>Physical Tests For Multiple Sclerosis</Button>
                        )}
                    </CardContent>
                </Card>
            </Grid>

            {/* Lab Results */}
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant='h2'>Lab Results</Typography>
                        {/* Buttons to view specific lab results */}
                        {/* ... */}
                    </CardContent>
                </Card>
            </Grid>

            {/* Vaccines */}
            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ minHeight: 400 }}>
                    <CardContent>
                        <Typography variant='h2'>Vaccines</Typography>
                        <div style={{ height: 300, width: '100%' }}>
                            <DataGrid
                                rows={medicalHistory.vaccines}
                                columns={columnsForVaccines}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                getRowId={(row) => row.id}
                            />
                        </div>
                    </CardContent>
                </Card>
            </Grid>

            {/* CT Scans */}
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant='h2'>CT Scans</Typography>
                        {/* Display CT scan records */}
                        {/* ... */}
                    </CardContent>
                </Card>
            </Grid>

            {/* X-Rays */}
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant='h2'>X-Rays</Typography>
                        {/* Display X-Ray records */}
                        {/* ... */}
                    </CardContent>
                </Card>
            </Grid>
            <Modal open={openRecordModal} onClose={() => setOpenRecordModal(false)}>
               <Box sx={style1}>
                  <Card sx={{minHeight:800, overflow:'auto'}}>
                  <PatientRecordView recordData={currentRecordData} />
                  </Card>
                    
               </Box>
            </Modal>
        </Grid>
    );
}
