const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    // Product
    app.post("/api/product",
        [authJwt.verifyToken],
        controller.addNewProduct
    );

    app.get("/api/products",
        //[authJwt.verifyToken],
        controller.listProducts
    );

    app.get("/api/product/:id",
        //[authJwt.verifyToken],
        controller.getSingleProduct
    );

    // Category
    app.post("/api/category",
        [authJwt.verifyToken],
        controller.addNewProductCategory
    );

    app.get("/api/categories",
        controller.listProductCategories
    );

    app.get("/api/category/:id",
        controller.getSingleCategory
    );

    app.get("/api/category/products/:id",
        controller.getCategoryProducts
    );
};
