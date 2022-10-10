const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require("dotenv").config({path : ".env"});
const app = express();

const employeeRoutes = require('./routes/employeeRoute');
const newUserRoute  =require('./routes/newuser');


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cors());


app.use("/", employeeRoutes);
app.use("/new", newUserRoute);

mongoose.connect(process.env.MONGOURI);


app.listen(process.env.APP_PORT || 2000);