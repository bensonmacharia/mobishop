const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(401).send({ message: "Wrong email or password!" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Wrong email or password!",
      });
    }

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email, roles: authorities },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 3600, // 1 hour
      });

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
      email: user.email,
      roles: authorities,
      token: token
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.addAdminUser = async (data) => {
  try {
    const user = await User.create({
      username: data.username,
      fname: data.fname,
      lname: data.lname,
      phone: data.phone,
      email: data.email,
      password: bcrypt.hashSync(data.password, 8),
    });

    const result = user.setRoles([3]);
    if (result) console.log("User registered successfully!");

  } catch (error) {
    console.log(error.message);
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};
