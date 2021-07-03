const userModel = require("./userModel");

module.exports.signUpWithDetails = (req, res) => {
  userModel
    .createNewUser({ ...req.body.user })
    .then((user) => {
      res.send({
        status: true,
        userCreated: true,
        user: user,
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        userCreated: false,
      });
    });
};

module.exports.signInWithDetails = (req, res) => {
  console.log('Request =====> ' + req)
  userModel
    .findUserByQuery({ email: req.body.user.email })
    .then((userDetails) => {
      if (!userDetails) {
        res.send({
          status: false,
          message: `This emailID : ${req.body.user.email} is not registered`,
        });
        return;
      }
      if (req.body.user.password !== userDetails.password) {
        res.send({
          status: false,
          message: `Invalid Password`,
        });
        return;
      }
      res.send({
        status: true,
        found: true,
        userDetails: userDetails,
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        found: false,
      });
    });
};
