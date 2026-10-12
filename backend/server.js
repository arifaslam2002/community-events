import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import eventRoute from "./routes/eventRoute.js";
import registrationRoute from "./routes/registrationRoute.js"
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDb();
app.use("/api/auth", authRoute);
app.use("/api/events", eventRoute);
app.use("/api/registration",registrationRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
