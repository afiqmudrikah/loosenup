const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

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

    console.log(post);
    res.json({ status: "ok", post });
  } catch (error) {
    console.error("Unable to post", error);
  }
};

module.exports = {
  userPost,
};
