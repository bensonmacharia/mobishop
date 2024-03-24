const { authJwt } = require("../middleware");
const db = require("../models");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require('uuid');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.newUser = async (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "User details can not be empty!"
    });
    return;
  }

  try {
    const user = await User.create({
      uuid: uuidv4(),
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    let result = "";
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      result = user.setRoles(roles);
      //if (result) res.send({ message: "User added successfully!" });
    } else {
      // user has role = 1
      result = user.setRoles([1]);
      //if (result) res.send({ message: "User added successfully!" });
    }

    let authorities = [];
    if (result) {
      const roles = await user.getRoles();
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
    }
    res.status(200).send({
      id: user.id,
      uuid: user.uuid,
      username: user.username,
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
      email: user.email,
      authorities: authorities
    });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: authJwt.getUserId(req),
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
  await User.findAll({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'user_roles'] },
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['id', 'name'],
        through: { attributes: [] } // Exclude user_roles from Role model
      }
    ]
  })
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

exports.updateUser = async (req, res) => {
  const uuid = req.params.uuid;
  // Validate request
  if (!uuid) {
    res.status(400).send({
      message: "User ID can not be empty!"
    });
    return;
  }
  try {
    const user = await User.findOne({ where: { uuid } });

    if (!user) {
      res.status(404).send({
        message: `User with UUID ${uuid} not found`
      });
      return;
    }
    // Update user fields
    user.username = req.body.username;
    user.fname = req.body.fname;
    user.lname = req.body.lname;
    user.phone = req.body.phone;
    user.email = req.body.email;

    // Update user roles
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      await user.setRoles(roles);
    }

    // Update user in the database
    await user.save();

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    res.status(200).send({
      id: user.id,
      uuid: user.uuid,
      username: user.username,
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
      email: user.email,
      authorities: authorities
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
