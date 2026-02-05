import { Schema, model } from "mongoose";


const tripSchema=Schema({
    
    departureDate:{
        type:Date,
        required:true
    },

from:{
        type:String,
        required:true
    },


passengers:{
        type:Number,
        required:true
    },

returnDate:{
        type:Date,
        required:true
    },


to:{
        type:String,
        required:true
    },


travelClass:{
        type:String,
        required:true
    },

tripType:{
        type:String,
        required:true
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    status:{
        type:String,
        enum:["pending","scheduled","declined","completed"],
        default:"pending"

    }
    
   
    
},{timestamps:true})

const tripModel=model("trips",tripSchema)
export default tripModel