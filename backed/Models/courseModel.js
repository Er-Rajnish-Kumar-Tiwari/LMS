const mongoose = require("mongoose");

// Minimal embedded user schema to avoid circular import
const embeddedUserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true }
}, { _id: false });

const lectureSchema = new mongoose.Schema({
  lectureId: { type: String, required: true },
  lectureTitle: { type: String, required: true },
  lectureDuration: { type: Number, required: true },
  lectureUrl: { type: String, required: true },
  isPreviewFree: { type: Boolean, required: true },
  lectureOrder: { type: Number, required: true }
});

const chapterSchema = new mongoose.Schema({
  chapterId: { type: String, required: true },
  chapterOrder: { type: Number, required: true },
  chapterTitle: { type: String, required: true },
  chapterContent: [lectureSchema]
}, { _id: false });

const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseDescription: { type: String, required: true },
  courseThumbnail: { type: String },
  coursePrice: { type: Number, required: true },
  isPublished: { type: Boolean, default: true },
  discount: { type: Number, required: true, min: 0, max: 100 },
  courseContent: [chapterSchema],
  courseRatings: [
    {
      userId: { type: String },
      rating: { type: Number, min: 1, max: 5 }
    }
  ],
  educator: {
    type: String,
    ref: "userModel",
    required: true
  },
  enrolledStudent: [embeddedUserSchema]
}, { timestamps: true, minimize: false });

const courseModel = mongoose.model("course", courseSchema);

module.exports = { courseModel, courseSchema };
