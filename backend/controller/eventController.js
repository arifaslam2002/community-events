import Event from "../models/Events.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, category, venue, date, startTime, maxAttends } =
      req.body;
    const event = await Event.create({
      title,
      description,
      category,
      venue,
      date,
      startTime,
      maxAttends,
      createdBy: req.userId,
    });
    res.status(201).json({
      message: "Event created Successfully",
      event,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("created By", "name email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
};
