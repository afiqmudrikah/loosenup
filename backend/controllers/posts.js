const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const userPost = async (req, res) => {
  try {
    const { email, password, title, content } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const checkHash = await bcrypt.compare(password, user.password);

    if (!checkHash) {
      res.json({ status: "error", message: "Invalid email or password" });
    }

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        userID: user.userID,
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
