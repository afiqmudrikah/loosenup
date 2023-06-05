const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", message: "No token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }
  } else {
    return res.status(403).send({ status: "error", message: "Missing token" });
  }
};

const moderatorAuth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res
      .status(400)
      .json({ status: "error", message: "No token found " });
  }

  const token = req.headers["authorization"].replace("Bearer", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

      if (decoded.isModerator) {
        req.decoded = decoded;
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(403).send({ status: "error", message: "Missing token" });
  }
};

module.exports = { auth, moderatorAuth };
