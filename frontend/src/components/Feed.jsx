import React from "react";
import { Box } from "@mui/material";
import Post from "./Post";
import PostForm from "./PostForm";

const Feed = () => {
  return (
    <Box flex={8} padding={2}>
      <PostForm />
      <Post />
    </Box>
  );
};

export default Feed;
