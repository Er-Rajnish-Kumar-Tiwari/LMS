const mongoose = require("mongoose");
const { courseSchema } = require("./courseModel");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledCourses: [courseSchema]
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = { userModel, userSchema };
