const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const { registerUser, loginUser, getUserById } = require("../services/authService");

router.post("/register", async (req, res) => {
  try {
    const userData = await registerUser(req.body);
    res.status(201).json({
      message: `${userData.username} has been created successfully.`,
    });
  } catch (error) {
    return res.status(409).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await loginUser(req.body);
    res.cookie("x-auth-token", userData.token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    }); // expires in 2 hours
    res.status(200).json({
      userData,
      message: `${userData.username} has been logget in successfully.`,
    });
  } catch (error) {
    return res.status(403).json({ error });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("x-auth-token");
  res.status(200).json("Logget out.");
});


router.get("/user/:id", async (req, res) => {
  try {
    const userData = await getUserById(req.params.id);
    console.log(userData);
    res.status(200).json(userData);
  } catch (error) {
    return res.status(409).json({ error });
  }
});

router.post("/verify", async (req, res, next) => {
  let isVerified = false;
  let tokenFromCookie = req.cookies["x-auth-token"];

  if (tokenFromCookie) {
    jwt.verify(tokenFromCookie, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie("x-auth-token");
        res.json({ isVerified });
        return;
      } else {
        isVerified = true;
        res.status(200).json({
          id: decoded.id,
          username: decoded.username,
          isVerified,
          favoriteMovies: decoded.favoriteMovies,
        });
        return;
      }
    });
  } else {
    res.json({ isVerified });
  }
});

module.exports = router;
