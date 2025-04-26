const {courseModel} = require("../Models/courseModel");
const purchaseModel = require("../Models/dashboardModel");
const {userModel}=require("../Models/userModel");

const dashboardData = async (req, res) => {
    try {
        const courses = await courseModel.find({});
        const totalCourses = courses.length;

        const courseIds = courses.map(course => course._id);
        const purchases = await purchaseModel.find({
            courseId: { $in: courseIds },
            status: "completed"
        });

        const totalEarning = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

        const enrollStudentData = [];

        for (const course of courses) {
            const students = course.enrolledStudent || []; // <-- Fix here

            students.forEach(student => {
                enrollStudentData.push({
                    courseTitle: course.courseTitle,
                    student: {
                        name: student.name,
                        email: student.email
                        // add imageUrl if it's part of embedded schema
                    }
                });
            });
        }

        const totalEnrollments=enrollStudentData.length;

        res.json({
            status: "200",
            dashboardData: { totalCourses, totalEarning,totalEnrollments }
        });

    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Some error occurred",
            error
        });
    }
};



const getDashboardData = async (req, res) => {
    try {
        const courses = await courseModel.find({});
        const totalCourses = courses.length;

        const courseIds = courses.map(course => course._id);
        const purchases = await purchaseModel.find({
            courseId: { $in: courseIds },
            status: "completed"
        });

        const enrollStudentData = [];

        for (const course of courses) {
            const students = course.enrolledStudent || []; // <-- Fix here

            students.forEach(student => {
                enrollStudentData.push({
                    courseTitle: course.courseTitle,
                    student: {
                        name: student.name,
                        email: student.email
                        // add imageUrl if it's part of embedded schema
                    }
                });
            });
        }

        res.json({
            status: "200",
            dashboardData: { enrollStudentData}
        });

    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Some error occurred",
            error
        });
    }
};

module.exports={getDashboardData,dashboardData};