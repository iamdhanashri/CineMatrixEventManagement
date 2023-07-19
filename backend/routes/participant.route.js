const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { participantModel } = require("../model/event.model");

const participant = express.Router();

// post

participant.get("/", async (req, res) => {
    try {
        const events = await participantModel.find();
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ message: 'Error while fetching events', error });
      }
});

// put

participant.get("/:id", async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await participantModel.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
      } catch (error) {
        res.status(500).json({ message: 'Error while fetching the event', error });
      }
});

// POST: Create a new user
participant.post("/", async (req, res) => {
    try {
        const eventData = req.body;
        const newEvent = await participantModel.create(eventData);
        res.status(201).json(newEvent);
      } catch (error) {
        res.status(500).json({ message: 'Error while creating the event', error });
      }
});

// PUT: Update a user by ID
participant.put("/:id", async (req, res) => {
    try {
        const eventId = req.params.id;
        const eventData = req.body;
        const updatedEvent = await participantModel.findByIdAndUpdate(eventId, eventData, {
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
participant.delete("/:id", async (req, res) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await participantModel.findByIdAndDelete(eventId);
        if (!deletedEvent) {
          return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error while deleting the event', error });
      }
});

module.exports = {
  participant,
};
