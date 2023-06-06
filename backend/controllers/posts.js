const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

// Create post
const userPost = async (req, res) => {
  try {
    const { email, title, content } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } });

    console.log(user);

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

module.exports = {
  userPost,
  getUserPosts,
};
