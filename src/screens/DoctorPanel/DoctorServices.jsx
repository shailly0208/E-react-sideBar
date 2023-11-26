import React from "react";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CardActionArea 
} from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import HealingIcon from '@mui/icons-material/Healing';

export function DoctorServices() {
    const services = [
        { icon: LocalHospitalIcon, title: "General Consultation", description: "Providing general health check-ups, advice, and recommendations." },
        { icon: AccessibilityNewIcon, title: "Physical Therapy", description: "Specialized in rehabilitation and physical therapies." },
        { icon: HealingIcon, title: "Surgery Planning", description: "Expert surgical planning and post-operative care." },
        // Add more services as needed
    ];

    const handleCardClick = (title) => {
        // Placeholder for click handler logic
        console.log(`Clicked on ${title}`);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Doctor Services
            </Typography>
            <Grid container spacing={3}>
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card 
                          sx={{ 
                            '&:hover': {
                              boxShadow: 6, // Change the shadow when hovering
                            }
                          }}
                        >
                            <CardActionArea onClick={() => handleCardClick(service.title)}>
                                <CardContent>
                                    <service.icon fontSize="large" />
                                    <Typography variant="h6" sx={{ mt: 1 }}>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body1">
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
