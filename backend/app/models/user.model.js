module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    fname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};
