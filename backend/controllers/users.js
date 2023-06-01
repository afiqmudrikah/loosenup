const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

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
  try {
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

const registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: parseInt(req.body.age),
      },
    });

    // console.log(hash, newUser);
    res.json({ status: "ok", message: "User registered!" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.json({
          status: "error",
          message: "Email or username already registered.",
        });
      }
    }
    console.error("Unable to register user", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // checkHash returns a boolean
    const checkHash = await bcrypt.compare(password, user.password);

    if (checkHash === false) {
      res.json({ status: "ok", message: "Wrong login info!" });
    } else {
      res.json({ status: "ok", message: "User logged in!" });
    }
  } catch (error) {
    console.error("Unable to login user", error);
    // res.json({ status: "error", message: "Wrong login info!" });
  }
};

// findUniqueOrThrow
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await prisma.user.findFirstOrThrow({
//     where: { email: email },
//   });

//   // checkHash returns a boolean
//   const checkHash = await bcrypt.compare(password, user.password);

//   res.json({ status: "ok", message: "User logged in!" });
// };

module.exports = {
  seedUsers,
  getUsers,
  postOneUser,
  patchUser,
  deleteUser,
  registerUser,
  loginUser,
};
