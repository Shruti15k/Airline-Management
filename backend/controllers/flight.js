import Flight from "../models/Flight.js";
import Seat from "../models/Seat.js";

export const createFlight = async (req,res,next)=>{
const newFlight=new Flight(req.body);

   try{
     const savedFlight= await newFlight.save()
     res.status(200).json(savedFlight)
   }catch(err){
    res.status(500).json(err)
   }
}

export const updateFlight = async (req,res,next)=>{

    try{
        const updatedFlight= await Flight.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true });
        res.status(200).json(updatedFlight);
      }catch(err){
       res.status(500).json(err);
      }
}

export const deleteFlight = async (req,res,next)=>{
    try{
        await Flight.findByIdAndDelete(req.params.id);
        res.status(200).json("Flight has been deleted");
      }catch(err){
       res.status(500).json(err);
      }
}

export const getFlight = async (req,res,next)=>{
    try{
        const flight = await Flight.findById(req.params.id);
        res.status(200).json(flight);
      }catch(err){
       res.status(500).json(err);
      }
}

export const getFlights = async (req, res, next) => {
  const { departcity, arrivecity,departdate, ...others} = req.query;
  try {
    const flights = await Flight.find({...others, departcity, arrivecity,departdate }).limit(req.query.limit);
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const countByCity = async (req,res,next)=>{
  const cities= req.query.cities.split(",")
  try{
      const list = await Promise.all(cities.map(arrivecity=>{
        return Flight.countDocuments({arrivecity:arrivecity})
      }))
      res.status(200).json(list);
    }catch(err){
      res.status(500).json(err);
    }
}

export const countByType = async (req,res,next)=>{
  
  try{
    const indigoCount= await Flight.countDocuments({type:"Indigo"})
    const airindiaCount=await Flight.countDocuments({type:"Air India"})
    const airasiaCount= await Flight.countDocuments({type:"Air Asia"})
    const vistaraCount= await Flight.countDocuments({type:"Vistara"})
    const akasaCount= await Flight.countDocuments({type:"AkasaAir"})
    const spicejetCount= await Flight.countDocuments({type:"Spicejet"})
      
      res.status(200).json([
        {type:"Indigo", count:indigoCount},
        {type:"Air India", count:airindiaCount},
        {type:"Air Asia", count:airasiaCount},
        {type:"Vistara", count:vistaraCount},
        {type:"Akasa Air", count:akasaCount},
        {type:"Spicejet", count:spicejetCount},
      ]);
    }catch(err){
      res.status(500).json(err);
    }
};

export const getFlightSeats = async(req,res,next) => {
  try{
     const flight = await Flight.findById(req.params.id);
     const list = await Promise.all(flight.seats.map((seat)=>{
      return Seat.findById(seat);
     })
    );
    res.status(200).json(list)
  }catch(err){
     next(err);
  }
};