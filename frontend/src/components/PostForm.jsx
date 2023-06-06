import { Box, Button, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
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
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <TextField
        label="Content"
        value={content}
        onChange={handleContentChange}
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Post
      </Button>
    </Box>
  );
};

export default PostForm;
