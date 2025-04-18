const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.AtlasURL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

module.exports = dbConnection;
