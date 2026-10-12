import Event from "../models/Events.js";
import Registration from "../models/Registration.js";

export const registerEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    if (!eventId) {
      return res.status(400).json({
        message: "EventId  is required",
      });
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        message: "Event  is not found",
      });
    }
    if ((event, createdBy.toString() === req.user.userId)) {
      return res.status(400).json({
        message: "You cannot register for this event you are host",
      });
    }
    const eventDateTime = new Date(
      `${event.date.toISOString().slice(0, 10)}T${event.startTime}:00`,
    );
    if (eventDateTime <= new Date()) {
      return res.status(400).json({
        message: "this already started",
      });
    }
    const existing = await Registration.findOne({
      user: req.userId,
      event: eventId,
    });
    if (existing) {
      return res.status(400).json({
        message: "Alredy registred",
      });
    }
    const count = await Registration.countDocuments({
      event: eventId,
    });
    if (count >= event.maxAttendees) {
      return res.status(400).json({
        message: "Event is full",
      });
    }
    const registration = await Registration.create({
      user: req.userId,
      event: eventId,
    });
    return res.status(201).json({
      message: "Registred succesfully",
      registration,
    });
  } catch (error) {
    return res.status(400).json({
      message: message.error,
    });
  }
};
export const MyRegistrations = async (req, res) => {
  try {
    const registration = await Registration.find({
      user: req.userId,
    }).populate("event");
    res.status(200).json({
      registration,
    });
  } catch (error) {
    return res.status(400).json({
      message: message.error,
    });
  }
};
export const cancelRegistration = async (req, res) => {
  const registration = await Registration.findOne({
    _id: req.params.id,
    user: req.userId,
  }).populate("event");
  if (!registration) {
    return res.status(400).json({
      message: "Registration not found",
    });
  }
  const event = registration.event;
  const eventDateTime = new Date(
    `${event.date.toISOString().slice(0, 10)}T${event.startTime}:00`,
  );
  if (eventDateTime <= new Date()) {
    return res.status(400).json({
      message: "canot cancel afeter the event as satrted",
    });
  }
  await registration.deleteOne();
  return res.status(200).json({
    message: "Registration deleted",
  });
};
export const getAttedees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({
        message: "Event  is not found",
      });
    }
    if ((event, createdBy.toString() === req.user.userId)) {
      return res.status(400).json({
        message: "Only organizer can view ",
      });
    }
    const attendees = await Registration.find({
      event: event_id,
    }).populate("user", "name email");
    res.status(200).json(attendees);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid event Id",
    });
  }
};
