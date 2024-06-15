import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import flightRoute from "./routes/flights.js";
import seatRoute from "./routes/seats.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect= async ()=>{
 try{
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.")
 }catch(error) {
    throw error;
 }
};

// mongoose.connection.on("disconnected", ()=>{
//     console.log("mongoDB disconnected!")
// });

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/flights", flightRoute);
app.use("/seats", seatRoute);


app.listen(7770,() =>{
    connect()
    console.log("server running on localhost:7770");
});