const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { eventModel } = require("../model/event.model");

const eventRouter = express.Router();

// post

eventRouter.get("/", async (req, res) => {
    try {
        const events = await eventModel.find();
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ message: 'Error while fetching events', error });
      }
});

// put

eventRouter.get("/:id", async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await eventModel.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
      } catch (error) {
        res.status(500).json({ message: 'Error while fetching the event', error });
      }
});

// POST: Create a new user
eventRouter.post("/", async (req, res) => {
    try {
        const eventData = req.body;
        const newEvent = await eventModel.create(eventData);
        res.status(201).json(newEvent);
      } catch (error) {
        res.status(500).json({ message: 'Error while creating the event', error });
      }
});

// PUT: Update a user by ID
eventRouter.put("/:id", async (req, res) => {
    try {
        const eventId = req.params.id;
        const eventData = req.body;
        const updatedEvent = await eventModel.findByIdAndUpdate(eventId, eventData, {
          new: true,
          runValidators: true,
        });
        if (!updatedEvent) {
          return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
      } catch (error) {
        res.status(500).json({ message: 'Error while updating the event', error });
      }
});

// DELETE: Delete a user by ID
eventRouter.delete("/:id", async (req, res) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await eventModel.findByIdAndDelete(eventId);
        if (!deletedEvent) {
          return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error while deleting the event', error });
      }
});

module.exports = {
  eventRouter,
};
