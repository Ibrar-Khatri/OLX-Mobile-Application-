const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: new Date() },
});

const userModel = new mongoose.model("users", userSchema);

module.exports.createNewUser = (userParameters) => {
  return new Promise((resolve, reject) => {
    let userInstance = new userModel(userParameters);

    userInstance.save((err, newUser) => {
      if (err) {
        return reject(err);
      }
      resolve(newUser);
    });
  });
};

module.exports.findUserByQuery = (query) => {
  return new Promise((resolve, reject) => {
    userModel.findOne(query, (err, userDetails) => {
      if (err) {
        return reject(err);
      }
      resolve(userDetails);
    });
  });
};
