const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const { ReviewSchema, Review } = require("../models/review");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    const product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://ui-avatars.com/api/?name=Product&size=50";

    product.save((err) => {
      if (err) {
        res.status(500).send({ error: "Server error" });
      }
    });
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  const page = parseInt(req.query.page) || 1;

  const filter = {};
  const sort = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.query) filter.name = req.query.query;
  if (req.query.price === "lowest") sort.price = 1;
  if (req.query.price === "highest") sort.price = -1;

  Product.find(filter)
    .sort(sort)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      if (err) return next(err);

      Product.countDocuments(filter).exec((err, count) => {
        if (err) return next(err);

        res.status(200).send({ products, totalCount: count });
      });
    });
});

router.get("/products/:product", (req, res) => {
  const productId = req.params.product;
  Product.findById(productId).exec((err, product) => {
    if (err) {
      res.status(500).send({ error: "Server error" });
    }

    if (!product) {
      res.status(404).send({ error: "Product not found" });
    }
    res.send(product);
  });
});

router.get("/products/:product/reviews", (req, res, next) => {
  const productId = req.params.product;
  const perPage = 4;
  const page = parseInt(req.query.page) || 1;

  Product.findById(productId).exec((err, product) => {
    if (err) {
      res.status(500).send({ error: "Server error" });
    }

    if (!product) {
      res.status(404).send({ error: "Product not found" });
    }

    const startingIndex = (page - 1) * perPage;
    const reviews = product.reviews.slice(
      startingIndex,
      startingIndex + perPage
    );
    Product.countDocuments().exec((err, count) => {
      if (err) return next(err);

      res.send({ reviews, totalCount: count });
    });
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
      res.status(500).send({ error: "Server error" });
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
      res.status(500).send({ error: "Server error" });
    }

    if (!product) {
      res.status(400).send({ error: "Product not found" });
    }
    product.reviews.push(review);

    product.save((err) => {
      if (err) {
        res.status(500).send({ error: "Server error" });
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
      res.status(500).send({ error: "Server error" });
    }
    if (!product) {
      res.status(404).send({ error: "No product found" });
    }
    res.status(200).send({ message: "Product deleted", product });
  });
});

router.delete("/reviews/:review", (req, res) => {
  const reviewId = req.params.review;
  const productId = req.body.product;

  Product.findById(productId).exec((err, product) => {
    if (err) {
      res.status(500).send({ error: "Server error" });
    }

    const review = product.reviews.findIndex((review) => {
      return review._id.toString() === reviewId;
    });

    if (review === -1) {
      res.status(404).send({ error: "No review found" });
    } else {
      product.reviews.splice(review, 1);
    }

    product.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ error: "Server error: Failed to delete review" });
      }

      res.status(200).send({ message: "Review Deleted" });
    });
  });
});

module.exports = router;
