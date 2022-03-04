import express from "express";
const userRouter = express.Router();
import {getAlluserFunction, registerFunction} from "../controller/UserController.js"
import {upload} from "../middleware/multer.js"

userRouter.route("/registerService").post(upload.single('profile'),registerFunction)
userRouter.route("/alluserService").get(getAlluserFunction)

export default userRouter