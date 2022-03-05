import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    user_email:{type:String,required:true},
    title:{type:String},
    demo:{type:String},
    github:{type:String},
    description:{type:String,required:true},
    flag:{type:Number,default:1}
})
export default mongoose.model("projectCollection",projectSchema)