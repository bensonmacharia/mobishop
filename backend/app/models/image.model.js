module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define("images", {
    url: {
      type: Sequelize.STRING
    }
  });

  return Image;
};
