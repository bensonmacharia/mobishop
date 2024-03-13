module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("categories", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });

  return Category;
};
