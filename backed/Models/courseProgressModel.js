const mongoose=require("mongoose");

const courseProgressSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    courseId:{type:String,required:true},
    completed:{type:Boolean,default:true},
    lectureCompleted:[],
});

const courseProgressModel=mongoose.model("courseProgress",courseProgressSchema);
module.exports=courseProgressModel;