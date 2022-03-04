import mongoose from "mongoose";
const db = "mongodb://localhost:27017/ProjectIshu";
export const connectDB = async ()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true})
        console.log("mongodb connected")
    }
    catch(err){
        console.log(err.message)
    }
}