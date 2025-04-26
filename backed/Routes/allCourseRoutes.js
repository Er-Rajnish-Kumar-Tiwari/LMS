const express = require("express");
const { getAllCourses, getCourseById } = require("../Controlls/allCourseControll");

const allCourseRouter = express.Router();

// Now handled as: GET /api/all-courses/
allCourseRouter.get("/getAllCourses", getAllCourses);

// Now handled as: GET /api/all-courses/:id
allCourseRouter.get("/getCourseById/:id", getCourseById);

module.exports = { allCourseRouter };
