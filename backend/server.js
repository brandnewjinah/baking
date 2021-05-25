const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//req middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");

//bring db
require("./config/db");

//req routes

//use middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//use router

const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log(`server started at ${PORT}`));
