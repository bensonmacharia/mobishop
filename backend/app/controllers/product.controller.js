const db = require("../models");
const { authJwt } = require("../middleware");
const Product = db.product;
const Category = db.category;
const Image = db.image;

const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

exports.addNewProduct = async (req, res) => {
    //console.log(authJwt.getUserId(req));
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Product can not be empty!"
        });
        return;
    }

    try {
        // Create a Product
        const product = await Product.create({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            userId: authJwt.getUserId(req),
            categoryId: req.body.categoryId,
            image: req.body.image
        });

        // Create Images
        if (req.body.images && req.body.images.length > 0) {
            const images = await Promise.all(req.body.images.map(image => Image.create({ url: image.url })));
            await product.setImages(images);
        }

        res.status(201).send({ message: "Product added successfully!" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.listProducts = async (req, res) => {
    await Product.findAll({
        include: [
            {
                model: Category, as: 'category',
                attributes: ['id', 'name']
            },
            {
                model: Image, as: 'images',
                attributes: ['id', 'url']
            }
        ],

    })
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
    await Product.findByPk(id, {
        include: [
            {
                model: Category, as: 'category',
                attributes: ['id', 'name']
            },
            {
                model: Image, as: 'images',
                attributes: ['id', 'url']
            }
        ],
    })
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

exports.updateProductCategory = async (req, res) => {
    const name = req.params.name;
    // Validate request
    if (!name) {
        res.status(400).send({
            message: "Category name can not be empty!"
        });
        return;
    }
    await Category.update(req.body, {
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('name')),
            sequelize.fn('lower', name)
        )
        //where: { name: { $iLike: name } }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product category was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update product category with name=${name}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating product category with name=" + name
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
    await Product.findAll({
        where: { categoryId: id }, include: [
            {
                model: Category, as: 'category',
                attributes: ['id', 'name']
            },
            {
                model: Image, as: 'images',
                attributes: ['id', 'url']
            }
        ],
    })
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