const Razorpay = require("razorpay");
const {courseModel} = require("../Models/courseModel");
const purchaseModel = require("../Models/dashboardModel");
const {userModel} = require("../Models/userModel");
const courseProgressModel = require("../Models/courseProgressModel");

const userData = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({
                Status: "404",
                Message: "User not found"
            });
        }

        res.status(200).json({
            Status: "200",
            Message: "User Data",
            data: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            Status: "500",
            Message: "Server Error"
        });
    }
};

const enrolledCourses = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).populate("enrolledCourses");
        if (!user) {
            return res.status(404).json({
                Status: "404",
                Message: "User not found"
            });
        }

        res.status(200).json({
            Status: "200",
            Message: "Enrolled Courses",
            data: user.enrolledCourses
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            Status: "500",
            Message: "Server Error"
        });
    }
};

const purchaseCourses = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const userData = await userModel.findById(userId);
    const courseData = await courseModel.findById(courseId);

    if (!userData || !courseData) {
      return res.status(404).json({
        Status: "404",
        Message: "User or Course not found",
      });
    }

    const alreadyEnrolled = userData.enrolledCourses.some(
      (c) => c._id.toString() === courseData._id.toString()
    );
    if (!alreadyEnrolled) {
      userData.enrolledCourses.push(courseData);
      await userData.save();
    }

    const alreadyAdded = courseData.enrolledStudent.some(
      (u) => u._id.toString() === userData._id.toString()
    );
    if (!alreadyAdded) {
      courseData.enrolledStudent.push({
        _id: userData._id,
        name: userData.name,
        email: userData.email
      });
      await courseData.save();
    }

    const discountedPrice = courseData.coursePrice - (courseData.discount * courseData.coursePrice / 100);
    const amountInINR = Math.round(discountedPrice * 85);

    const purchaseData = {
      courseId: courseData._id,
      userId: userData._id,
      amount: amountInINR,
      status: "completed",
    };

    const newPurchase = await purchaseModel.create(purchaseData);

    const razorpay = new Razorpay({
      key_id: process.env.RAZOR_ID,
      key_secret: process.env.RAZOR_PASS,
    });

    const options = {
      amount: amountInINR,
      currency: "INR",
      receipt: `order_rcptid_${newPurchase._id}`,
      notes: {
        userId: userData._id.toString(),
        courseId: courseData._id.toString(),
        purchaseId: newPurchase._id.toString()
      },
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(400).json({
        Status: "error",
        Message: "Failed to create Razorpay order",
      });
    }

    newPurchase.razorpayOrderId = order.id;
    await newPurchase.save();

    res.status(200).json({
      Status: "200",
      Message: "Razorpay order created",
      order,
      purchaseId: newPurchase._id,
      amount: amountInINR
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      Status: "500",
      Message: "Server Error",
      error: error.message,
    });
  }
};

const updateCourseProgress=async(req,res)=>{

  try {
    const {userId,courseId,lectureId}=req.body;
    const progressData=await courseProgressModel.findOne({userId,courseId});
  
    if(progressData){
  
      if(progressData.lectureCompleted.includes(lectureId)){
        return res.json({Status:"200",Massage:"Lecture already completed"});
      }
  
      progressData.lectureCompleted.push(lectureId);
      await progressData.save();
  
    }
    else{
      await courseProgressModel.create({
        courseId,
        userId,
        lectureCompleted:[lectureId]
      });
    };
  
    res.json({Status:"200",Massage:"Progress Updated"});
  
  }
  catch (error) {
    res.json({Status:"404",Massage:"some error",error:error.Message});
  }
};

const getCourseProgress=async(req,res)=>{

  try {

    const {userId,courseId}=req.body;
    const progressData=await courseProgressModel.findOne({userId,courseId});
    res.json({Status:"200",Massage:"Course Progress",progressData});

  }
   catch (error) {
    res.json({Status:"404",Massage:"some error",error:error.message});
  }
};

const addRatings = async (req, res) => {
  try {
    const { userId, courseId, ratings } = req.body;

    // Input validation:  Check for required fields and valid rating value
    if (!userId || !courseId || !ratings || ratings < 1 || ratings > 5) {
      return res.status(400).json({ Status: "400", Message: "Invalid input: userId, courseId, and ratings are required. Ratings must be between 1 and 5." });
    }

    // Find the course
    const courseData = await courseModel.findById(courseId);
    if (!courseData) {
      return res.status(404).json({ Status: "404", Message: "Course not found" });
    }

    // Find the user and check enrollment
    const userData = await userModel.findById(userId);
    if (!userData || !userData.enrolledCourses.some(c => c._id.toString() === courseId.toString())) {
      return res.status(400).json({ Status: "400", Message: "Course not purchased" });
    }

    // Update or add the rating
    const existingRatingIndex = courseData.courseRatings.findIndex(r => r.userId.toString() === userId.toString());

    if (existingRatingIndex > -1) {
      // Update existing rating
      courseData.courseRatings[existingRatingIndex].ratings = ratings;
    } else {
      // Add new rating
      courseData.courseRatings.push({ userId, ratings });
    }

    // Calculate the new average rating
    let totalRating = 0;
    for (const ratingData of courseData.courseRatings) {
      totalRating += ratingData.ratings;
    }
    const averageRating = totalRating / courseData.courseRatings.length;
    courseData.averageRating = averageRating; // Store the average in the course model

    // Save the updated course data
    await courseData.save();

    // Respond with success and the new average rating
    res.status(200).json({
      Status: "200",
      Message: "Rating added/updated successfully",
      totalRating,
      averageRating
    });
  } catch (error) {
    // Handle errors: Log the error and send a 500 response
    console.error("Error in addRatings:", error);
    res.status(500).json({ Status: "500", Message: "Internal server error", error: error.message });
  }
};

module.exports = { userData, enrolledCourses, purchaseCourses,updateCourseProgress,getCourseProgress,addRatings};
