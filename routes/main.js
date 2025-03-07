const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.get("/products/:product", (req, res) => {
  // returns product by ID
});

router.get("/products/:product/reviews", (req, res) => {
  // returns all the reviews for a product but limits to 4 at a time. should take an optional page query param
});

router.post("/products", (req, res) => {
  // Creates new product in DB
});

router.post("/products/:product/reviews", (req, res) => {
  // Creates new review in DB by adding it to correct products review array
});

router.delete("/products/:product", (req, res) => {
  // Deletes product by ID
});

router.delete("/reviews/:review", (req, res) => {
  // Deletes a review by ID
});

module.exports = router;
