const db = require("../models");
const Product = db.product;
const Category = db.category;

exports.addNewProduct = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Product can not be empty!"
        });
        return;
    }

    // Create a Product
    const product = {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image
    };

    // Save Product in the database
    await Product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while adding the product."
            });
        });
};

exports.listProducts = async (req, res) => {
    await Product.findAll({ include: ["category"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};

exports.getSingleProduct = async (req, res) => {
    const id = req.params.id;
    await Product.findByPk(id, { include: ["category"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Product with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Product with id=" + id
            });
        });
};

exports.updateProduct = async (req, res) => {
    const id = req.params.id;

    await Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;

    await Product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};

exports.addNewProductCategory = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Category can not be empty!"
        });
        return;
    }

    // Create a Category
    const category = {
        name: req.body.name
    };

    // Save Product in the database
    await Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while adding the category."
            });
        });
};

exports.listProductCategories = async (req, res) => {
    await Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
};

exports.getSingleCategory = async (req, res) => {
    const id = req.params.id;
    await Category.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Category with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Category with id=" + id
            });
        });
};

exports.getCategoryProducts = async (req, res) => {
    const id = req.params.id;
    await Product.findAll({ where: { categoryId: id }, include: ["category"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error retrieving products for category with id=" + id
            });
        });
};