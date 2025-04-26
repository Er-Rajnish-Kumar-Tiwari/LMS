const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const userRouter = require("./Routes/userRoutes.js");
const dbConnection = require("./Config/db.js");
const connectedCloudinary = require("./Config/cloudnary.js");
const courseRouter = require("./Routes/courseRoutes.js");
const dashboardRouter = require("./Routes/dashboardRoutes.js");
const { allCourseRouter } = require("./Routes/allCourseRoutes.js");
const userDataRouter = require("./Routes/userDataRoutes.js");
require("dotenv").config();


const app=express();
app.use(express.json());
app.use(cors());
dbConnection();
connectedCloudinary();
app.use(userRouter);
app.use(courseRouter);
app.use(dashboardRouter);
app.use(allCourseRouter);
app.use(userDataRouter);
 
app.listen(process.env.PORT);