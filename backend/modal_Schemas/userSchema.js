import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"first name required"],
        maxlength:[30,"first name not exceed 30 char"],
        minlength:[3,"first name should be at least 3 char"]
    },
    lastname:{
        type:String,
        required:[true,"last name requires"],
        maxlength:[30,"last name not exceed 30 char"],
        minlength:[3,"last name should  be 3 char"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        validate:[validator.isEmail,"pls enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[5,"password should be grater than 8 char"]
    },
    profile:{
        type:String,
        required:"true"
    }
}) 
export default mongoose.model("userCollection",userSchema)