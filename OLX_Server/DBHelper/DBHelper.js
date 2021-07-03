const mongoose = require("mongoose");

module.exports.connectWithDB = () => {
  mongoose.connect(
    "mongodb+srv://admin_01:admin_01@cluster0.lbv0t.mongodb.net/OLX?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  const db = mongoose.connection;
  db.once("error", (err) => {
    console.log("Error in connecting to DB");
    console.log(err);
  });

  db.once("open", () => {
    console.log("Connected to DB successfully...!");
  });
};
