const { courseModel } = require("../Models/courseModel");
const fs = require("fs");

const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body;
        const image = req.file.filename;

        if (!image) {
            return res.json({
                Status: "404",
                Message: "Thumbnail not attached"
            });
        }

        // Create a new course instance with the data
        const course = new courseModel({
            courseData,
            image
        });

        // Save the course to the database
        await course.save();

        res.json({
            Status: "200",
            Message: "Course Added",
            course
        });
    } catch (error) {
        console.error("Error adding course:", error);
        res.json({
            Status: "404",
            Message: "Some error occurred while adding the course"
        });
    }
};

const displayCourse = async (req, res) => {
    try {
        const courses = await courseModel.find({});
        res.json({
            Status: "200",
            Message: "Course List",
            courses
        });
    } catch (error) {
        console.error("Error displaying courses:", error);
        res.json({
            Status: "404",
            Message: "Some error occurred while fetching courses",
            error
        });
    }
};

module.exports = { addCourse, displayCourse };
