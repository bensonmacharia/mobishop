const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    return res.status(200).send({
      id: user.id,
      username: user.username,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      authorities: authorities
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.listAllUsers = async (req, res) => {
  await User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
