const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Exercise = require("../../models/Exercise");

const router = express.Router();

router.get("/get-auth-user", auth, async (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        msg: "User not registered",
      });
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(404).json({
        msg: "Password Incorrect",
      });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        } else {
          return res.json({ token });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

router.post("/new-user", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    const saltPassword = await bcrypt.hash(password, 10);

    user = new User({
      username: username,
      email: email,
      password: saltPassword,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        } else {
          return res.json({ token });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const { description, duration } = req.body;
    const exercise = new Exercise({
      userId: req.user.id,
      description: description,
      duration: parseInt(duration),
    });

    await exercise.save();

    return res.json(exercise);
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

router.get("/log/:user_id", auth, async (req, res) => {
  try {
    const limit = req.query.limit;
    if (limit) {
      const log = await Exercise.find({ userId: req.params.user_id }).limit(
        parseInt(limit)
      );
      return res.json(log);
    } else {
      const log = await Exercise.find({ userId: req.params.user_id });
      return res.json(log);
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

router.get("/log", auth, async (req, res) => {
  try {
    const limit = req.query.limit;
    if (limit) {
      const log = await Exercise.find({ userId: req.user.id }).limit(
        parseInt(limit)
      ).sort({date: -1});
      return res.json(log);
    } else {
      const log = await Exercise.find({ userId: req.user.id }).sort({date: -1});;
      return res.json(log);
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

router.put("/log/activity/:activity_id", auth, async (req, res) => {
  try {
    const activity = await Exercise.findById(req.params.activity_id);
    if (activity.userId.toString() !== req.user.id) {
      return res.status(404).json({
        msg: "Exercise does not belong to this user",
      });
    }
    activity.completed = !activity.completed;
    await activity.save();
    return res.json(activity);
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

router.delete("/log/activity/:activity_id", auth, async (req, res) => {
  try {
    const activity = await Exercise.findById(req.params.activity_id);

    if (activity.userId.toString() !== req.user.id) {
      return res.status(404).json({
        msg: "Exercise does not belong to this user",
      });
    }

    await Exercise.findByIdAndRemove(req.params.activity_id);
    return res.json({
      msg: "Exercise removed",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

module.exports = router;
