const express = require("express");
const cors = require("cors");
const app = express();

const users = require("./routers/users");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", users);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});