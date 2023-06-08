import { Box } from "@mui/material";
import React from "react";
import PostForm from "./PostForm";
import Post from "./Post";

const Home = () => {
  return (
    <Box flex={8} padding={2}>
      <PostForm />
      <Post />
    </Box>
  );
};

export default Home;
