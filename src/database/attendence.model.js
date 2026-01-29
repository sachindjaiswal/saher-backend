import mongoose from "mongoose";


const attendenceSchema = new mongoose.Schema({
    email : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},{timestamps:true})

export const Attendence = mongoose.model("Attendence",attendenceSchema)