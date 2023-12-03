// DoctorLayout.js
import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DoctorSideBar from "../components/DoctorComponents/DoctorSidebar";

function DoctorLayout(userInfo) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
    const doctor_id = userInfo.doctorInfo.id;


    if (userInfo.doctorInfo.type !== "Doctor") {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DoctorSideBar 
                    open={sidebarOpen} 
                    handleDrawerOpen={ () => setSidebarOpen(true)} 
                    handleDrawerClose={()=>setSidebarOpen(false)} 
                />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',  
                        p: 3, // Adds padding inside the box, you can adjust as needed
                        maxWidth: 'lg', // Set a maximum width (you can use values like 'sm', 'md', 'lg', 'xl', or px values)
                        margin: 'auto', // This centers the content
                        width: '100%', // Use the full width available      
                    }}
                >
                    <Toolbar />
                    <Outlet context={doctor_id} />
                </Box>
            </Box>
        </>
    );
}

export default DoctorLayout;
