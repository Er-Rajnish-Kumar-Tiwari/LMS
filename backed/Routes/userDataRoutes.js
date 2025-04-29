const express=require("express");
const  {userData, enrolledCourses, purchaseCourses, updateCourseProgress, getCourseProgress, addRatings, validate}= require("../Controlls/userDataControll");
const authMiddleware = require("../Middleware/authMiddleware");

const userDataRouter=express.Router();

userDataRouter.post("/user-data",authMiddleware,userData);
userDataRouter.post("/enrolled-data",authMiddleware,enrolledCourses);
userDataRouter.post("/payment",authMiddleware,purchaseCourses);
userDataRouter.post("/update-course-progress",updateCourseProgress);
userDataRouter.post("/get-course-progress",getCourseProgress);
userDataRouter.post("/add-ratings",addRatings);
userDataRouter.post("/validate",validate);

module.exports=userDataRouter;