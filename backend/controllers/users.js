const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
  {
    email: "user1@example.com",
    username: "user1",
    password: "password1",
    firstName: "John",
    lastName: "Smith",
    age: 25,
  },
  {
    email: "user2@example.com",
    username: "user2",
    password: "password2",
    firstName: "Alex",
    lastName: "Tan",
    age: 30,
  },
];

const seedUsers = async (req, res) => {
  console.log(1);
  try {
    console.log(2);

    await prisma.user.deleteMany();

    for (const user of users)
      await prisma.user.create({
        data: user,
      });

    res.json({ status: "ok", message: "Data seeded" });
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
  }
};

const postOneUser = async (req, res) => {
  try {
    const id = req.body.userID;
    const user = await prisma.user.findUnique({
      where: { userID: id },
    });

    res.json(user);
  } catch (error) {
    console.error("Error getting user", error);
  }
};

const patchUser = async (req, res) => {
  try {
    const id = req.body.userID;
    const newAge = req.body.age;
    const updatedUser = await prisma.user.update({
      where: { userID: id },
      data: { age: newAge },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.body.userID;
    const deleteUser = await prisma.user.delete({
      where: { userID: id },
    });

    res.json(deleteUser);
  } catch (error) {
    console.error("Error deleting user", error);
  }
};

module.exports = {
  seedUsers,
  getUsers,
  postOneUser,
  patchUser,
  deleteUser,
};
