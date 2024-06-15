import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createSeat, deleteSeat,updateSeat,getSeat,getSeats } from "../controllers/seat.js";
const router=express.Router();

//create
router.post("/:flightid",verifyAdmin, createSeat);

//update
router.put("/:id",verifyAdmin, updateSeat);

//delete
router.delete("/:id/:flightid",verifyAdmin, deleteSeat);

//get
router.get("/:id",getSeat);

//get all
router.get("/",getSeats);

export default router