const express=require("express");
const upload = require("../Config/multer");
const { addCourse, displayCourse } = require("../Controlls/courseControll");

const courseRouter=express.Router();

courseRouter.post("/addCourse",upload.single("image"),addCourse);
courseRouter.get("/getCourse",displayCourse);

module.exports=courseRouter;