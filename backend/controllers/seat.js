import Seat from "../models/Seat.js";
import Flight from "../models/Flight.js";
import { createError } from "../utils/error.js";

export const createSeat = async (req,res,next)=>{

    const flightId = req.params.flightid;
    const newSeat = new Seat(req.body)

    try{
       const savedSeat = await newSeat.save();
       try{
         await Flight.findByIdAndUpdate(flightId, {$push : {seats: savedSeat._id}})
       }catch(err){
        next(err)
       }
       res.status(200).json(savedSeat);
    }catch(err){
        next(err)
    }
};

export const updateSeat = async (req,res,next)=>{

    try{
        const updatedSeat= await Seat.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true });
        res.status(200).json(updatedSeat);
      }catch(err){
       res.status(500).json(err);
      }
}

export const deleteSeat = async (req,res,next)=>{
  const flightId = req.params.flightid;
    try{
        await Seat.findByIdAndDelete(req.params.id);
        try{
          await Flight.findByIdAndUpdate(flightId, {$pull : {seats: req.params.id}});
        }catch(err){
         next(err)
        }
        res.status(200).json("Seat has been deleted");
      }catch(err){
       res.status(500).json(err);
      }
}

export const getSeat = async (req,res,next)=>{
    try{
        const seat = await Seat.findById(req.params.id);
        res.status(200).json(seat);
      }catch(err){
       res.status(500).json(err);
      }
}

export const getSeats = async (req,res,next)=>{
    try{
        const seats = await Seat.find();
        res.status(200).json(seats);
      }catch(err){
        res.status(500).json(err);
      }
}