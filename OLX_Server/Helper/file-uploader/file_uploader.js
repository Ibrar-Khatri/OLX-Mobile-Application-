var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dgeoktom1",
  api_key: "412298476351254",
  api_secret: "Vq7wVo4NWHA_IugWC1tiPOHruns",
});

module.exports.upLoadImageOnCloudinary = (imageSource) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      "data:image/jadbpeg;base64," + imageSource,
      {
        resource_type: "image",
      },
      function (error, result) {
        if (error) {
          console.log("Unable to uplaod iamge =====> " + error);
          return reject(error);
        } else {
          console.log("Image upload successfully");
          resolve(result);
        }
      }
    );
  });
};
