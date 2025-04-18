const express = require("express");
const cors = require("cors");
const dbConnection = require("./Config/db");
const clerkWebhooks = require("./Controlls/webhooks");
require("dotenv").config();

const app = express();

// middleware
app.use(express.json());
dbConnection();
app.use(cors());

// Routes
app.get("/",(req,res)=>res.send({Status:"200",Massage:"API Working"}));
app.post("/clerk",express.json(),clerkWebhooks);


app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
