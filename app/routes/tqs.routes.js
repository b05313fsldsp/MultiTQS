module.exports = app => {
  const tqs = require("../controllers/tqs.controller.js");

  var router = require("express").Router();

  // Create a new Tqs
  router.post("/", tqs.create);

  // Retrieve all Tqs
  router.get("/", tqs.findAll);

  // Retrieve all published Tqs
  router.get("/published", tqs.findAllPublished);

  // Retrieve a single Tqs with id
  router.get("/:id", tqs.findOne);

  // Update a Tqs with id
  router.put("/:id", tqs.update);

  // Delete a Tqs with id
  router.delete("/:id", tqs.delete);

  // Create a new Tqs
  router.delete("/", tqs.deleteAll);

  app.use("/monitor/tqs", router);
};
