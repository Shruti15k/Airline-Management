import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    type:{
        type: String,
        required:true
    },
    departcity:{
        type: String,
        required:true
    },
    arrivecity:{
        type: String,
        required:true
    },
    departtime:{
        type: String,
        required:true
    },
    arrivetime:{
        type: String,
        required:true
    },
    duration:{
        type: String,
        required:true
    },
    departdate:{
        type: Date,
        required:true
    },
    seats:{
        type: [String],
    },
    price:{
        type: Number,
        required: true
    },
    photos:{
        type:[String],
    },
    featured:{
        type: Boolean,
        default:false,
    },
    rating:{
        type: Number,
        min:0,
        max:5,
    },
});

export default mongoose.model("Flight",FlightSchema)