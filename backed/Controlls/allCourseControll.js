const {courseModel} = require("../Models/courseModel")


const getAllCourses = async (req, res) => {

    try {
        const courses = await courseModel.find({}).select(['-courseContent', '-enrolledStudents']);
        res.json({
            Status:"200",
            courses
        })
    } catch (error) {
        res.json({
            Status:"404",
            Massage:"some error",
            error
        });
    };
};

const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const courseData = await courseModel.findById(id);

        if (!courseData) {
            return res.status(404).json({
                status: "404",
                message: "Course not found"
            });
        }

        courseData.courseContent.forEach(course => {
            course.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl = "";
                }
            });
        });

        res.status(200).json({
            status: "200",
            courseData
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Server error",
            error: error.message
        });
    }
};

module.exports={getAllCourses,getCourseById};