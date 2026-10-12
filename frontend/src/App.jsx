
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvents";
import MyRegistrations from "./pages/MyRegistration";

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [refresh, setRefresh] = useState(0);

  const handleEventCreated = () => {
    setRefresh((prev) => prev + 1);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <h1>Community Event Management</h1>

      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>

          <button onClick={logout}>Logout</button>

          <CreateEvent onEventCreated={handleEventCreated} />

          <Events key={refresh} />

          <hr />

          <MyRegistrations />
        </div>
      ) : (
        <div>
          <Register />

          <hr />

          <Login onLogin={setUser} />
        </div>
      )}
    </div>
  );
};

export default App;
