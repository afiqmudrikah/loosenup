import React from "react";
import { Typography, Paper } from "@mui/material";

const Comment = (props) => {
  return (
    <Paper elevation={2} sx={{ padding: "16px" }}>
      <Typography variant="h2" gutterBottom>
        Title
      </Typography>
      <Typography variant="body1" gutterBottom>
        Post
      </Typography>
      <Typography variant="h3" gutterBottom>
        Comments
      </Typography>
    </Paper>
  );
};

export default Comment;
