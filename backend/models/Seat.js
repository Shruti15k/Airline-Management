import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    price:{
        type: Number,
        required:true,
    },
    maxpeople:{
        type: Number,
        required:true,
        unique: false,
    },
    seatnumber:[{number:String, unavailable:{type:[Date]}}],

   
},{timestamps:true}
);

export default mongoose.model("Seat",SeatSchema)