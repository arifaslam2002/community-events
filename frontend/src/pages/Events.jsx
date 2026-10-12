
import { useEffect, useState } from "react";
import API from "../api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  const getEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      setMessage("Failed to load events");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const res = await API.post("/registrations", { eventId });
      setMessage(res.data.message || "Registered successfully");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div>
      <h2>All Events</h2>

      <p>{message}</p>

      {events.length === 0 && <p>No events available</p>}

      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Category: {event.category}</p>
          <p>Venue: {event.venue}</p>
          <p>Date: {event.date.slice(0, 10)}</p>
          <p>Start Time: {event.startTime}</p>
          <p>Maximum Attendees: {event.maxAttendees}</p>

          <button onClick={() => handleRegister(event._id)}>
            Register for Event
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default Events;
