import React, { useState } from 'react';
import { Modal, Box, Button, Typography, Card, CardContent, TextField, Grid, List, ListItem, ListItemIcon, Paper, Snackbar  } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import FloatingChatWindow from '../FloatingChatWindow';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid'


export function PatientMedicalHistory({ patientId }) {
    console.log("Patient Medical History",patientId);
    return(
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
           <Card  sx={{minHeight: 400}}>
            <CardContent>
            <Typography variant='h2'>Total Records</Typography>
            </CardContent>
           </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
           <Card>
            <CardContent>
               <Typography variant='h2'>Physical Tests</Typography>
               <Button> Physical Tests For CKD</Button> 
               <Button> Physical Tests For Heart Disease</Button> 
               <Button> Physical Tests For Multiple Sclerosis</Button> 
               <Button> Physical Tests For Coronary Artery Disease</Button> 
            </CardContent>
           </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
           <Card>
            <CardContent>
            <Typography variant='h2'>Lab Results</Typography>
            <Button> ECG </Button> 
            <Button> Eye Test </Button>
            <Button> Blood Tests </Button>
            <Button> Tumor </Button>
            </CardContent>
           </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} >
           <Card sx={{minHeight: 400}}>
            <CardContent>
            <Typography variant='h2'>Vacinnes</Typography>
            </CardContent>
           </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} >
           <Card>
            <CardContent>
            <Typography variant='h2'>CT Scans</Typography>
            </CardContent>
           </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} >
           <Card>
            <CardContent>
            <Typography variant='h2'>X-Rays</Typography>
            </CardContent>
           </Card>
        </Grid>
    </Grid>
    );
}