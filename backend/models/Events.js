import mongoose from "mongoose";
import User from "./User.js"
const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
           type:String,
        required:true
    },
    category:{
           type:String,
        required:true,
        enum:[
            "Technology",
            "Education",
            "Sports",
            "Business",
            "Entertainment"
        ]
    },
    venue:{
           type:String,
        required:true
    },
    date:{
           type:Date,
        required:true
    },
    startTime:{
           type:String,
        required:true
    },
    maxAttends:{
           type:Number,
        required:true,
        min:1
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
})
const Event = mongoose.model("Event",eventSchema);
export default Event;