const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbHelper = require("./DBHelper/DBHelper");
const userRoute = require("./modules/user/userRoute");
const addRoute = require("./modules/adds/addRoute");
const app = express();
const port = process.env.PORT;
var multer = require("multer");
var upload = multer({});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRoute);
app.use("/add", upload.array("images"), addRoute);

app.get("*", (req, res) => {
  res.send("<h1>Welcome to OLX Server</h1>");
});

app.listen(port, (err) => {
  if (err) {
    console.log("Server Cannot be Started Successfully...!");
    console.log("Error IS =====> ", err);
    return;
  }
  console.log("Server Started Successfully");
  dbHelper.connectWithDB();
});
