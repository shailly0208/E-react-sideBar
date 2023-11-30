import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, List, ListItem, ListItemText, Checkbox, TextField, Button } from '@mui/material';

const DoctorTasksList = ({ doctorId }) => {
  const [tasks, setTasks] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/getDoctorReminders', { doctorId });
        setTasks(response.data.map((reminder, index) => ({
          id: index,
          text: reminder.reminder_description,
          completed: false // Assuming reminders don't have a 'completed' state initially
        })));
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchReminders();
  }, [doctorId]);

  const handleToggle = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleNewReminderChange = (e) => {
    setNewReminder(e.target.value);
  };

  const addReminder = async () => {
    try {
      await axios.post('http://localhost:8080/saveDoctorReminder', {
        doctorId,
        reminderDescription: newReminder
      });
      setTasks([...tasks, { id: tasks.length, text: newReminder, completed: false }]);
      setNewReminder('');
    } catch (error) {
      console.error('Error adding new reminder:', error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} dense>
            <Checkbox
              edge="start"
              checked={task.completed}
              tabIndex={-1}
              disableRipple
              onChange={() => handleToggle(task.id)}
            />
            <ListItemText primary={task.text} />
          </ListItem>
        ))}
      </List>
      <TextField
        label="New Reminder"
        value={newReminder}
        onChange={handleNewReminderChange}
        fullWidth
        margin="normal"
        sx={{mb:2, mt:2}}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addReminder}
        fullWidth
      >
        Add Reminder
      </Button>
    </Paper>
  );
};

export default DoctorTasksList;
