const {courseModel} = require("../Models/courseModel");

const cloudinary=require("cloudinary").v2;

const addCourse=async(req,res)=>{
    try {
        const {courseData}=req.body;
        const image=req.file;

        if(!image){
            return res.json({
                Status:"404",
                Massage:"Thumbnail not attached"
            });
        }

        const parseCourseData=await JSON.parse(courseData);
        const newCourse=await courseModel.create(parseCourseData);
        const imageUploaded=await cloudinary.uploader.upload(image.path);
        newCourse.courseThumbnail=imageUploaded.secure_url;

        await newCourse.save();
        res.json({
            Status:"200",
            Massage:"Course Added"
        });
    } 
    catch (error) {
        res.json({
            Status:"404",
            Massage:"some error"
        });
    };
};

const displayCourse=async(req,res)=>{
    try {
       const courses=await courseModel.find({});

       res.json({
        Status:"200",
        Massage:"Course List",
        courses
       }) ;
    } 
    catch (error) {
        res.json({
            Status:"404",
            Massage:"some error",
            error
        });
    };
}

module.exports={addCourse,displayCourse};