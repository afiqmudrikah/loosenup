import React, { useState, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import UserContext from "../context/user";

const PostForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(
      import.meta.env.VITE_SERVER + `/loosenup/posts/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          title: title,
          content: content,
        }),
      }
    );
    const data = await res.json();

    if (res.ok) {
      if (data.status === "error") {
        alert("Unable to create post");
      } else {
        setTitle("");
        setContent("");
        console.log("Created post");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        backgroundColor: "#f7f9fb",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        width: "600px",
        marginBottom: "25px",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        sx={{ marginBottom: "16px" }}
        label="Title"
        value={title}
        onChange={handleTitleChange}
        fullWidth
        variant="outlined"
      />
      <TextField
        sx={{ marginBottom: "16px" }}
        label="What's happening?"
        value={content}
        onChange={handleContentChange}
        multiline
        rows={4}
        fullWidth
        variant="outlined"
      />
      <Button
        sx={{ alignSelf: "flex-end" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Post
      </Button>
    </Box>
  );
};

export default PostForm;
