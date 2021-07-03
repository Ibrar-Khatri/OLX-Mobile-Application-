const addModel = require("./addModel");
const image_uploader = require("../../Helper/file-uploader/file_uploader");

module.exports.addNewPostWithDetails = (req, res) => {
  let addDetails = JSON.parse(req.body.addDetails);

  let images = req.body.images.map((img) => {
    return JSON.parse(img);
  });

  let imageUrls = [];

  new Promise((resolve, reject) => {
    images.forEach(async (image) => {
      await image_uploader
        .upLoadImageOnCloudinary(image.base64)
        .then((result) => {
          imageUrls.push(result.url);
          if (images.length === imageUrls.length) {
            resolve();
          }
        })
        .catch((err) => {
          console.log("Unable to upload image  ===> " + err);
          reject(image.name);
        });
    });
  })
    .then(() => {
      addDetails.imageUrls = imageUrls;
      addModel
        .createNewAdd(addDetails)
        .then((addDetails) => {
          console.log("New ad created successfully ====> " + addDetails);
          res.send({
            status: true,
            created: true,
            addDetails: addDetails,
          });
        })
        .catch((err) => {
          console.log("New ad cannot be created successfully ====> " + err);
          res.send({
            status: false,
            created: false,
          });
        });
    })
    .catch((name) => {
      res.send({
        message: `The image that you have selected \"\ ${name} \"\ is larger than 60MB. Unable to send this image`,
      });
    });
};
module.exports.getAllAds = (req, res) => {
  addModel
    .getAllAdsFromDB({})
    .then((ads) => {
      res.send({
        status: true,
        found: true,
        ads: ads,
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        found: false,
      });
    });
};
module.exports.getAddById = (req, res) => {
  // console.log(req.body.id);
  // res.send({
  //   status: true,
  //   ad: req.body.id,
  // });
  addModel
    .getAddById({ _id: req.body.id })
    .then((ad) => {
      res.send({
        status: true,
        found: true,
        ad: ad,
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        found: false,
      });
    });
};

module.exports.getMyAds = (req, res) => {
  console.log(req.body.email);

  addModel
    .getMyAdsFromDB({ email: req.body.email })
    .then((ads) => {
      res.send({
        status: true,
        found: true,
        ads: ads,
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        found: false,
      });
    });
};
