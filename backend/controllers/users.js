const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const seedUsers = async (req, res) => {
  try {
    await prisma.user.deleteMany();

    const mod = [
      {
        email: "moderator@example.com",
        username: "moderator",
        password: "password123",
        firstName: "John",
        lastName: "Smith",
        age: 25,
        isModerator: true,
      },
    ];

    for (const user of mod) {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
      await prisma.user.create({
        data: user,
      });
    }

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

    if (!user) {
      return res.json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // checkHash returns a boolean
    const checkHash = await bcrypt.compare(password, user.password);

    if (!checkHash) {
      return res.json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const payload = {
      name: user.username,
      role: user.isModerator,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({
      status: "ok",
      message: "User logged in!",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Unable to login user", error);
    res.json({ status: "error", message: "Unable to login" });
  }
};

module.exports = {
  seedUsers,
  getUsers,
  postOneUser,
  patchUser,
  deleteUser,
  registerUser,
  loginUser,
};
