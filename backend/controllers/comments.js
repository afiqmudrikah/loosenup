const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// Create comment
const createComment = async (req, res) => {
  try {
    const { email, content, postID } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } });

    const comment = await prisma.comment.create({
      data: {
        content: content,
        user: {
          connect: { userID: user.userID },
        },
        post: {
          connect: {
            postID: postID,
          },
        },
      },
    });

    res.json({ status: "ok", comment });
  } catch (error) {
    console.error("Unable to create comment", error);
  }
};

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: { user: true, post: true },
    });

    res.json(comments);
  } catch (error) {
    console.error("Unable to retrieve comments", error);
  }
};

// Update comment
const updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const content = req.body.content;

    await prisma.comment.update({
      where: {
        commentID: parseInt(id),
      },
      data: {
        content: content,
      },
    });

    const updatedComment = await prisma.comment.findUnique({
      where: { commentID: parseInt(id) },
    });

    res.json(updatedComment);
  } catch (error) {
    console.error("Unable to update comment", error);
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;

    const comment = await prisma.comment.delete({
      where: {
        commentID: parseInt(id),
      },
    });

    res.json(comment);
  } catch (error) {
    console.error("Unable to delete comment", error);
  }
};

module.exports = {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
};
