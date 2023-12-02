import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HelpIcon from '@mui/icons-material/Help';
export const mainListItems = (
  <React.Fragment>
    
    
    <ListItemButton component={Link} to={"/Admin/help"}>
      <ListItemIcon>
        <MedicalServicesIcon />
      </ListItemIcon>
      <ListItemText primary="Doctor Request" />
    </ListItemButton>


    <ListItemButton component={Link} to={"/Admin/contact"}>
      <ListItemIcon>
       < HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Contact Us"   />
    </ListItemButton>

   
    <ListItemButton component={Link} to={"/Admin/review"}>
      <ListItemIcon>
       < MessageIcon />
      </ListItemIcon>
      <ListItemText primary="Reviews"   />
    </ListItemButton>

    <ListItemButton component={Link} to={"/Admin"}>
      <ListItemIcon>
       < PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Join Us"   />
    </ListItemButton>

  </React.Fragment>
);

