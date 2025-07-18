import mongoose from "mongoose";
import {Schema} from "mongoose";
const ResumeSchema = new Schema({
    resumeId:{
        type:String,
        require: true
    }
});

const Resume = mongoose.model("Hr",ResumeSchema);
export default Resume; 