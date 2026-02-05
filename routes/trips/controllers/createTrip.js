import tripModel from "../../../models/tripModel.js";



export default async function createTrip(req,res,next) {
    try {
        const newTrip=await tripModel.create(req.body)
    } catch (error) {
        next({code:500,message:error.message})
    }
}