const express=require("express");
const { dashboardData, getDashboardData } = require("../Controlls/dashboardControll");

const dashboardRouter=express.Router();

dashboardRouter.get("/dashboard",dashboardData);
dashboardRouter.get("/studentEnrolled",getDashboardData);

module.exports=dashboardRouter;