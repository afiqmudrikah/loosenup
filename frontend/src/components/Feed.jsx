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
} from "@mui/material";
import Post from "./Post";
import PostForm from "./PostForm";
import { Delete, Edit, Favorite, FavoriteBorder } from "@mui/icons-material";
import UserContext from "../context/user";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { accessToken } = useContext(UserContext);

  const getAllPosts = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + `/loosenup/posts`);
    const data = await res.json();
    setPosts(data);
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
                    {item.userID.firstName}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="edit" onClick={() => openModal(item)}>
                    <Edit />
                  </IconButton>
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
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(item.postID)}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
    </Box>
  );
};

export default Feed;
