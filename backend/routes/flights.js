import express from "express";
import { countByCity, countByType, createFlight, deleteFlight, getFlight, getFlightSeats, getFlights, updateFlight } from "../controllers/flight.js";
import Flight from "../models/Flight.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/",verifyAdmin, createFlight);

//update
router.put("/:id",verifyAdmin, updateFlight);

//delete
router.delete("/:id",verifyAdmin, deleteFlight);

//get
router.get("/find/:id",getFlight);

//get all
router.get("/",getFlights);
router.get("/countByCity",countByCity);
router.get("/countByType",countByType);
router.get("/seat/:id",getFlightSeats);

export default router;