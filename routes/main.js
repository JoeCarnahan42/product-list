const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    const product = new Product();

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
  const page = parseInt(req.query.page) || 1;

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

router.get("/products/:product", (req, res, next) => {
  const productId = req.params.product;
  Product.findById(productId).exec((err, product) => {
    if (err) {
      return next(err);
    }

    if (!product) {
      res.status(404).send({ error: "Product not found" });
    }
    res.send(product);
  });
});

router.get("/products/:product/reviews", (req, res) => {
  const productId = req.params.product;
  const perPage = 4;
  const page = parseInt(req.query.page) || 1;

  Product.findById(productId).exec((err, product) => {
    if (err) {
      return next(err);
    }

    if (!product) {
      res.status(404).send({ error: "Product not found" });
    }

    const startingIndex = (page - 1) * perPage;
    const reviews = product.reviews.slice(
      startingIndex,
      startingIndex + perPage
    );

    res.send(reviews);
  });
});

router.post("/products", (req, res) => {
  // Creates new product in DB
  const product = new Product();

  product.category = JSON.stringify(req.body.category);
  product.name = JSON.stringify(req.body.name);
  product.price = parseInt(req.body.price);
  product.reviews = [];
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
