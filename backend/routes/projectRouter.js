import express from "express";
const projectRouter = express.Router();
import {addNewProjectFunction, deleteprojectFunction, fetchAllProjectFunction, fetchProjectFunction, updateprojectFunction} from "../controller/projectController.js"

projectRouter.route("/addNewprojectService").post(addNewProjectFunction);
projectRouter.route("/fetchAllprojectService").get(fetchAllProjectFunction);
projectRouter.route("/fetchprojectService").get(fetchProjectFunction);

projectRouter.route("/updateprojectService").post(updateprojectFunction);
projectRouter.route("/deleteprojectService").delete(deleteprojectFunction);
export default projectRouter