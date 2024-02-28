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
};
