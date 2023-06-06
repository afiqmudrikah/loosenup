import React, { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import UserContext from "../context/user";

const Post = () => {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  const getUserPosts = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + `/loosenup/posts/${user.userID}`
    );
    const data = await res.json();
    console.log(data);
    setPosts(data);
  };

  useEffect(() => {
    // runs on mount

    getUserPosts();
  }, []);

  return (
    <div>
      {posts.map((item) => {
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
                  {user.firstName.slice(0, 1)}
                </Avatar>
              }
              action={<IconButton aria-label="settings"></IconButton>}
              title={item.title}
              titleTypographyProps={{ fontSize: "1.5rem" }}
              subheader={formattedDate}
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
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default Post;
