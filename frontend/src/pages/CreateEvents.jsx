
import { useState } from "react";
import API from "../api";

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technology");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/events", {
        title,
        description,
        category,
        venue,
        date,
        startTime,
        maxAttendees: Number(maxAttendees),
      });

      setMessage(res.data.message || "Event created successfully");

      setTitle("");
      setDescription("");
      setCategory("Technology");
      setVenue("");
      setDate("");
      setStartTime("");
      setMaxAttendees("");

      onEventCreated();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to create event"
      );
    }
  };

  return (
    <div>
      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br /><br />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Technology">Technology</option>
          <option value="Education">Education</option>
          <option value="Sports">Sports</option>
          <option value="Business">Business</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <br /><br />

        <input
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Maximum Attendees"
          value={maxAttendees}
          onChange={(e) => setMaxAttendees(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Create Event</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default CreateEvent;
