import express from "express";
const userRouter = express.Router();
import {registerFunction} from "../controller/UserController.js"
import {upload} from "../middleware/multer.js"

userRouter.route("/registerService").post(upload.single('profile'),registerFunction)

export default userRouter