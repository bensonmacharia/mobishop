const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
require('dotenv').config();
const bcrypt = require("bcryptjs");
const controller = require("./app/controllers/auth.controller");

const app = express();

var corsOptions = {
  credentials: true,
  origin: process.env.CORS_ORIGIN
};

// cors
app.use(cors(corsOptions));

app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: process.env.COOKIE_NAME,
    keys: [process.env.COOKIE_SECRET],
    httpOnly: true,
  })
);

// database
const db = require("./app/models");
const Role = db.role;
const Product = db.product;
const User = db.user;
const Category = db.category;

db.product.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.product.belongsTo(db.category, {
  foreignKey: "categoryId",
  as: "category",
});

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initialRoles();
  initialAdimUser();
  initialProductCategoriess();
  initialProducts();
});
//db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mobishop." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initialRoles() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

function initialProductCategoriess() {
  Category.create({
    icon: "FaMouse",
    name: "Mouse",
    class: "fa"
  });
  Category.create({
    icon: "RiBatteryChargeFill",
    name: "Adapters",
    class: "ri"
  });
  Category.create({
    icon: "MdOutlineCable",
    name: "Cables",
    class: "md"
  });
  Category.create({
    icon: "FaRegKeyboard",
    name: "Keyboards",
    class: "f1"
  });
  Category.create({
    icon: "MdSettingsInputComponent",
    name: "Accessories",
    class: "md"
  });
}

function initialProducts() {
  Product.create({
    name: "Nike SuperRep 2",
    description: "The Nike Air Zoom SuperRep 2 is designed specifically for high-intensity classes. With two air zoom units in the forefoot, this shoe provides a snappy response during even the hardest interval training. An upgraded, customizable fit gives comfier support for burpees, jumps, and more.",
    quantity: 340,
    price: 350.00,
    images: [
      {
        "url": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
      }
    ],
    userId: 1,
    categoryId: 2
  });

  Product.create({
    name: "Nike Air Force",
    description: "Everything you love about the AF1—but doubled! The Air Force 1 Shadow puts a playful twist on a hoops icon to highlight the best of AF1 DNA. With 2 eyestays, 2 mudguards, 2 backtabs and 2 Swoosh logos, you get a layered look with double the branding.",
    quantity: 861,
    price: 250.00,
    images: [
      {
        "url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1624&q=80"
      }
    ],
    userId: 1,
    categoryId: 5
  });

  Product.create({
    name: "Nike Free Run",
    description: "Made for short runs when you want a barefoot-like feel, the Nike Free Run 2018 feels super light and flexible. Its sock-like upper has more stretch yarns than previous versions, so it hugs your feet more than ever. The innovative sole has an updated construction, yet still expands and contracts with every movement. The packable design makes the shoe easy to stuff into your bag—so you can get in a few miles on the fly.",
    quantity: 119,
    price: 200.00,
    images: [
      {
        "url": "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }
    ],
    userId: 1,
    categoryId: 1
  });

  Product.create({
    name: "Nike All White",
    description: "The Nike Air Force 1 Shadow puts a playful twist on a classic b-ball design.Using a layered approach, doubling the branding and exaggerating the midsole, it highlights AF-1 DNA with a bold, new look.",
    quantity: 84,
    price: 320.00,
    images: [
      {
        "url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      }
    ],
    userId: 1,
    categoryId: 3
  });

  Product.create({
    name: "New K-Swiss",
    description: "A modern synthesis of heritage styles, the CR Terrati merges several distinct worlds of the K-Swiss archive for a brand-new hiking-inspired silhouette made for urban exploration. The upper combines the best elements from our ‘90s technical hiking line with modern upgrades. The result is a tastefully rugged construction ready for your next adventure.",
    quantity: 757,
    price: 699.00,
    images: [
      {
        "url": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1179&q=80"
      }
    ],
    userId: 1,
    categoryId: 2
  });

  Product.create({
    name: "Red Air Jordan",
    description: "The Air Jordan XII Taxi returns in its original form, launched in the season of MJs fifth championship. The iconic design features a white, tumbled-leather upper, Taxi Gold pops on the lace stays and black leather to finish the upper. A touch of Varsity Red peeks through the solid black outsole and the 23 on the heel strip.",
    quantity: 120,
    price: 599.00,
    images: [
      {
        "url": "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }
    ],
    userId: 1,
    categoryId: 2
  });

  Product.create({
    name: "Nike Zoom SD",
    description: "Whether rotating or gliding, the Nike Zoom SD 4 delivers a contoured support for elite-level performance. The no-sew upper provides seamless comfort while the midfoot strap and Flywire cables wrap under the arch, erasing internal movement as you're preparing to launch.",
    quantity: 71,
    price: 499.00,
    images: [
      {
        "url": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
      }
    ],
    userId: 1,
    categoryId: 1
  });

  Product.create({
    name: "Adidas Samba",
    description: "Born on the pitch, the Samba is a timeless icon of street style. This silhouette stays true to its legacy with a tasteful, low-profile, soft leather upper, suede overlays and gum sole, making it a staple in everyone's closet - on and off the pitch.",
    quantity: 63,
    price: 299.00,
    images: [
      {
        "url": "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }
    ],
    userId: 1,
    categoryId: 3
  });

  Product.create({
    name: "New Balance",
    description: "A true embodiment of New Balance's timeless design and performance innovation returns to the MADE in USA lineup in 2023. The original 998, released in 1993, was the first shoe to utilize ABZORB cushioning. This revolutionary step forward in shock absorption was matched visually with a sleek update to the classic 99X series look. The MADE in USA 998 features an OG grey colorway in a premium pigskin suede and mesh upper construction.",
    quantity: 30,
    price: 499.00,
    images: [
      {
        "url": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
      }
    ],
    userId: 1,
    categoryId: 2
  });

  Product.create({
    name: "Nike Air Max",
    description: "Another wonderful new Nike Air Max 90 Ultra SE comes right here in a smooth fabric and foam mix. Attractive colours like Hyper Cobalt and Dark Obsidian makes this version to one of your favourite companion for every day! Reinventing an icon, the foam uppers offer a soft feel and cushioning with perforations for breathable comfort. Elevating a classic, the synthetic overlays add lightweight support, sat upon a visible Air Max unit and rubber at the heel and toe for totally enhanced breathability.",
    quantity: 15,
    price: 399.00,
    images: [
      {
        "url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }
    ],
    userId: 1,
    categoryId: 4
  });
}

function initialAdimUser() {
  data = {
    username: process.env.ADMIN_USERNAME,
    fname: process.env.ADMIN_FNAME,
    lname: process.env.ADMIN_LNAME,
    phone: process.env.ADMIN_PHONE,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASS
  }
  controller.addAdminUser(data);
}