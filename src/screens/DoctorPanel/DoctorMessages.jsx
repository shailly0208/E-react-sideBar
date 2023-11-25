import React, { useState } from "react";
import { Box, Typography, TextField, Button, Card, CardContent, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export function DoctorMessages() {
    const [selectedPatient, setSelectedPatient] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handlePatientChange = (event) => {
        setSelectedPatient(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = () => {
        if (message.trim() !== '') {
            setMessages([...messages, { patientId: selectedPatient, text: message }]);
            setMessage('');
        }
    };

    // Dummy patient list for example purposes
    const patients = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        // Add more patients here
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Doctor Messages
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="patient-select-label">Select Patient</InputLabel>
                <Select
                    labelId="patient-select-label"
                    value={selectedPatient}
                    label="Select Patient"
                    onChange={handlePatientChange}
                >
                    {patients.map((patient) => (
                        <MenuItem key={patient.id} value={patient.id}>
                            {patient.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Write a message"
                multiline
                rows={4}
                value={message}
                onChange={handleMessageChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
            />

            <Button variant="contained" color="primary" onClick={sendMessage}>
                Send Message
            </Button>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Previous Messages:</Typography>
                <Card variant="outlined" sx={{ mt: 1 }}>
                    <CardContent>
                        {messages.map((msg, index) => (
                            <Typography key={index} sx={{ mb: 1 }}>
                                {msg.text}
                            </Typography>
                        ))}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
