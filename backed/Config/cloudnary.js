const cloudinary=require("cloudinary").v2;

const connectedCloudinary=async()=>{
    cloudinary.config({
        cloud_name : process.env.Cloud_NAME,
        api_key : process.env.Cloud_KEY,
        api_secret: process.env.Cloud_SECRET
    });
};

module.exports=connectedCloudinary;