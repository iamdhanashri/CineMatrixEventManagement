const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");

const userRouter = express.Router();

// post

userRouter.get("/", async (req, res) => {
    const user= await userModel.find()
    res.status(200).send(user)
});

// put

userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Error getting user" });
  }
});

// POST: Create a new user
userRouter.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    const user=new userModel(req.body)
    await user.save()
    res.send("user created")
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// PUT: Update a user by ID
userRouter.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});

// DELETE: Delete a user by ID
userRouter.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findByIdAndDelete(userId);
    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = {
  userRouter,
};
