
import { useEffect, useState } from "react";
import API from "../api";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [message, setMessage] = useState("");

  const getRegistrations = async () => {
    try {
      const res = await API.get("/registrations/my");
      setRegistrations(res.data);
    } catch (error) {
      setMessage("Failed to load registrations");
    }
  };

  useEffect(() => {
    getRegistrations();
  }, []);

  const handleCancel = async (registrationId) => {
    try {
      const res = await API.delete(
        `/registrations/${registrationId}`
      );

      setMessage(res.data.message || "Registration cancelled");
      getRegistrations();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Cancellation failed"
      );
    }
  };

  return (
    <div>
      <h2>My Registrations</h2>

      <p>{message}</p>

      {registrations.length === 0 && (
        <p>You have no registrations.</p>
      )}

      {registrations.map((registration) => (
        <div key={registration._id}>
          <h3>{registration.event?.title || "Event unavailable"}</h3>

          {registration.event && (
            <>
              <p>Venue: {registration.event.venue}</p>
              <p>Date: {registration.event.date.slice(0, 10)}</p>
              <p>Time: {registration.event.startTime}</p>
            </>
          )}

          <button
            onClick={() => handleCancel(registration._id)}
          >
            Cancel Registration
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default MyRegistrations;
