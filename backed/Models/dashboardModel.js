const mongoose=require("mongoose");

const purchaseSchema=new mongoose.Schema({

    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseModel",
        required:true
    },

    userId:{
        type:String,
        ref:"userModel",
        required:true
    },

    amount:{
       type:Number,
       required:true 
    },

    status:{
        type:String,
        enum:["pending","completed","failed"],
        default:"pending"
    }

},{timestamps:true});

const purchaseModel=mongoose.model("Purchase",purchaseSchema);
module.exports=purchaseModel;