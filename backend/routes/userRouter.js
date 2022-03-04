import express from "express";
const userRouter = express.Router();
import {getAlluserFunction, loginFunction, registerFunction} from "../controller/UserController.js"
import {upload} from "../middleware/multer.js"

userRouter.route("/registerService").post(upload.single('profile'),registerFunction)
userRouter.route("/alluserService").get(getAlluserFunction)
userRouter.route("/loginService").post(loginFunction)
export default userRouter