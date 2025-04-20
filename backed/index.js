const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const userRouter = require("./Routes/userRoutes.js");
const dbConnection = require("./Config/db.js");
require("dotenv").config();


const app=express();
app.use(express.json());
app.use(cors());
dbConnection();
app.use(userRouter);
 
app.listen(process.env.PORT);