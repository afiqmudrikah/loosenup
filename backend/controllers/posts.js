const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// Create post
const userPost = async (req, res) => {
  try {
    const { email, title, content } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } });

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        user: {
          connect: { userID: user.userID },
        },
        published: true,
      },
    });

    res.json({ status: "ok", post });
  } catch (error) {
    console.error("Unable to post", error);
  }
};

// Get user posts
const getUserPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { userID: id },
      include: { posts: true },
    });

    res.json(user.posts);
  } catch (error) {
    console.error("Unable to retrieve posts", error);
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true },
    });

    res.json(posts);
  } catch (error) {
    console.error("Unable to retrieve posts", error);
  }
};

// Update post
const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const content = req.body.content;

    await prisma.post.update({
      where: {
        postID: parseInt(id),
      },
      data: {
        content: content,
      },
    });

    const sortPosts = await prisma.post.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    console.log(sortPosts);
    res.json(sortPosts);
  } catch (error) {
    console.error("Unable to retrieve posts", error);
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await prisma.post.delete({
      where: {
        postID: parseInt(id),
      },
    });

    res.json(post);
  } catch (error) {
    console.error("Unable to retrieve posts", error);
  }
};

module.exports = {
  userPost,
  getUserPosts,
  getAllPosts,
  updatePost,
  deletePost,
};
