import express from 'express';
const PORT = 5000
import userRouter from './routes/userRouter.js';
import { connectDB } from './configDb/connection.js';
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("../frontend/public/images/",express.static("public"));
app.use("/user",userRouter)
connectDB();
app.listen(PORT,(err)=>{
    if(err)throw err;
    console.log(`Working on ${PORT}`)
})