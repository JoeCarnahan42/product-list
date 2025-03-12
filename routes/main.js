const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const { ReviewSchema, Review } = require("../models/review");
const product = require("../models/product");

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
  const product = new Product();

  product.category = req.body.category;
  product.name = req.body.name;
  product.price = parseInt(req.body.price);
  product.image = "https://via.placeholder.com/250?text=Product+Image";

  product.save((err) => {
    if (err) {
      throw err;
    }
    res.status(201).send({ message: "Product added", product: product });
  });
});

router.post("/products/:product/reviews", (req, res) => {
  const productId = req.params.product;

  const review = new Review({
    userName: req.body.userName,
    text: req.body.text,
  });

  Product.findById(productId).exec((err, product) => {
    if (err) {
      return next(err);
    }

    if (!product) {
      res.status(400).send({ error: "Product not found" });
    }
    product.reviews.push(review);

    product.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).send({
        message: "Review added",
        product: product,
      });
    });
  });
});

router.delete("/products/:product", (req, res) => {
  const productId = req.params.product;

  Product.findByIdAndDelete(productId).exec((err, product) => {
    if (err) {
      throw err;
    }
    if (!product) {
      res.status(404).send({ error: "No product found" });
    }
    res.status(200).send({ message: "Product deleted", product });
  });
});

router.delete("/reviews/:review", (req, res) => {
  // Deletes a review by ID
});

module.exports = router;
