const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config({path : ".env"});
const app = express();

const employeeRoutes = require('./routes/employeeRoute');



app.use(express.json());
app.use(cors());


app.use("/", employeeRoutes);

mongoose.connect(process.env.MONGO_URI);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("employer/build"));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "employer", "build", "index.html"));
    })
}


app.listen(process.env.APP_PORT || 2000);