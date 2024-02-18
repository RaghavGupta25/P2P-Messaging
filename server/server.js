import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import "./utils/filterOldMessages.js"

const app = express();



dotenv.config();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cookieParser());

//app.get(
//  "/",
//  (
//    req,
//    res //home route
//  ) => res.send("hello world")
//);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});
