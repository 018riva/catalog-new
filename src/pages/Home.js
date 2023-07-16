import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Home() {
    return (
      <>
        <Box sx={{  color: "black", marginTop: "100px", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>Tables with actors and movies</Typography>
            <Typography variant="h6" gutterBottom>You can view the table with movies or actors, select the appropriate section of the menu. You can also view the list of registered users. All information is available only to registered users.</Typography>
        </Box>
      </>
    )
  }

export default Home;