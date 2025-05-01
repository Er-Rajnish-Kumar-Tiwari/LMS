const express=require("express");
const { addCourse, displayCourse } = require("../Controlls/courseControll");
const multer = require("multer");

const courseRouter=express.Router();

const storage = multer.diskStorage({
    destination: "Uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

courseRouter.post("/addCourse",upload.single("image"),addCourse);
courseRouter.get("/getCourse",displayCourse);

module.exports=courseRouter;