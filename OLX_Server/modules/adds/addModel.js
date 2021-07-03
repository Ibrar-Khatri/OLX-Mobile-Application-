const mongoose = require("mongoose");

const addSchema = new mongoose.Schema({
  email: String,
  phoneNumber: String,
  userName: String,
  category: String,
  subCategory: String,
  condition: String,
  type: String,
  title: String,
  description: String,
  location: String,
  price: String,
  imageUrls: [String],
  createdAt: { type: Date, default: new Date() },
  favouriteAdds: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      userEmail: String,
      userName: String,
    },
  ],
});

const addModel = new mongoose.model("adds", addSchema);

module.exports.createNewAdd = (addDetails) => {
  return new Promise((resolve, reject) => {
    const newAdd = new addModel(addDetails);

    newAdd.save((err, success) => {
      if (err) {
        return reject(err);
      }
      resolve(success);
    });
  });
};

module.exports.getAllAdsFromDB = (query) => {
  return new Promise((resolve, reject) => {
    addModel
      .find(query)
      .then((ads) => {
        resolve(ads);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getAddById = (query) => {
  return new Promise((resolve, reject) => {
    addModel
      .findOne(query)
      .then((ad) => {
        resolve(ad);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports.getMyAdsFromDB = (query) => {
  return new Promise((resolve, reject) => {
    addModel
      .find(query)
      .then((ads) => {
        resolve(ads);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
