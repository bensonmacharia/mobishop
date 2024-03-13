module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define("images", {
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });

  return Image;
};
