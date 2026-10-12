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
// export const getEvents = async (req, res) => {
//   try {
//     const events = await Event.find().populate("created By", "name email");
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch events",
//     });
//   }
// };
export const getEvetById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    res.status(200).json(event);
  } catch (error) {
    return res.status(404).json({
      message: "Invalid event Id",
    });
  }
};
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "You can only update  your own event",
      });
    }
    const fields = [
      "title",
      "description",
      "category",
      "venue",
      "date",
      "startTime",
      "maxAttends",
    ];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        event[field] = req.body[field];
      }
    });
    await event.save();
    res.status(201).json({
      message: "Event Updated Successfully",
      event,
    });
  } catch (error) {
    return res.status(400).json({
      message: message.error,
    });
  }
};
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "You can only delete  your own event",
      });
    }
    await event.deleteOne();
    res.status(201).json({
      message: "Event deleted Successfully",
      event,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Event iD is invalid",
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    const filter = {};
    if (search) {
      filter.title = {
        $regex: search,
        $option: "i",
      };
    }
    if (category) {
      filter.category = category;
    }
    const sortOrder = sort === "desc" ? -1 : 1;
    const events = await Event.find(filter)
      .populate("created By", "name email")
      .sort({ date: sortOrder, startTime: sortOrder });
    res.status(200).json(events);
  } catch (error) {
    return res.status(400).json({
      message: "Event iD is invalid",
    });
  }
};
