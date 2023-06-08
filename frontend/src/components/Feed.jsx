import React, { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import Post from "./Post";
import PostForm from "./PostForm";
import {
  Delete,
  Edit,
  Favorite,
  FavoriteBorder,
  Comment,
} from "@mui/icons-material";
import UserContext from "../context/user";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { accessToken, user, isModerator } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalPostID, setModalPostID] = useState(null);

  const getAllPosts = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + `/loosenup/posts`);
    const data = await res.json();
    setPosts(data);
  };

  const handleDelete = async (postID) => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + `/loosenup/posts/${postID}`,
      {
        method: "DELETE",
      }
    );
    getAllPosts();
  };

  const openModal = (item) => {
    setModalPostID(item.postID);
    setModalContent(item.content);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleModalContentChange = (event) => {
    setModalContent(event.target.value);
  };

  const handleModalUpdate = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + `/loosenup/posts/${modalPostID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: modalContent,
        }),
      }
    );
    const data = res.json();

    if (res.ok) {
      if (data.status === "error") {
        alert("Unable to update post");
      } else {
        console.log("Updated post");
      }
    }

    closeModal();
    getAllPosts();
  };

  useEffect(() => {
    // runs on mount
    getAllPosts();
  }, [posts]);

  return (
    <Box flex={8} padding={2}>
      {posts
        .slice()
        .reverse()
        .map((item) => {
          const createdDate = item.createdAt;
          const date = new Date(createdDate);

          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          };
          const formattedDate = date.toLocaleDateString("en-US", options);

          return (
            <Card sx={{ maxWidth: 600 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "lightblue" }} aria-label="profile">
                    {item.user.firstName.slice(0, 1)}
                  </Avatar>
                }
                action={
                  <>
                    {item.userID === user.userID && (
                      <IconButton
                        aria-label="edit"
                        onClick={() => openModal(item)}
                      >
                        <Edit />
                      </IconButton>
                    )}
                  </>
                }
                title={item.title}
                titleTypographyProps={{ fontSize: "1.5rem" }}
                subheader={
                  <>
                    @{item.user.username}
                    <br />
                    {formattedDate}
                  </>
                }
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.content}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                </IconButton>
                <>
                  {(item.userID === user.userID || isModerator) && (
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(item.postID)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </>
                <IconButton aria-label="comment">
                  <Comment />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      <Modal open={open} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Update Post
          </Typography>
          <TextField
            multiline
            fullWidth
            value={modalContent}
            onChange={handleModalContentChange}
          />
          <Button variant="contained" onClick={handleModalUpdate}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Feed;
