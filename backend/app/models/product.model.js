module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.DOUBLE
    }
  });

  return Product;
};
