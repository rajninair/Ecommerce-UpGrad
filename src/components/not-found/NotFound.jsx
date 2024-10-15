import React from "react";
import { Box, Grid2 as Grid, Paper, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }} 
    >
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "2rem", textAlign: "center" }}>
          <Box
            component="img"
            src="404-page.jpg" 
            alt="404 Not Found"
          />
          <Typography variant="h4" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Typography variant="body1">
            The page you are looking for does not exist.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NotFound;
