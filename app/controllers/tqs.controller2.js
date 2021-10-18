const db = require("../models");
const Tqs = db.tqs;

// Create and Save a new Tqs
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


"tqstimestamps":"2021-08-10 09:06:33.891",
"temp2":"[-40-210]",
"concentration":"[0-62]",
"fldtemp2prelimfmi":"[number]",
"fldpropprelimfmi":"[number]",
"fluidproperty":"[number]",
"tanklevel":"[0-100]",
"temp1":"[-40-210]",
"tanklevel2":"[0-6425]",
"fldtnklvlprelimfmi":"[number]",
"fldtnk1tempprelimfmi":"[number]",
"status":"online"

  // Create a Tqs
  const tqs = new Tqs({
    title: req.body.title,
    SN: req.body.SN,
    CANID: req.body.CANID,
    SPN1761: req.body.SPN1761,
    TTIMESTAMP: req.body.TTIMESTAMP,
    createAt: req.body.createAt,
    published: req.body.published ? req.body.published : false
  });

  // Save Tqs in the database
  tqs
    .save(tqs)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tqs."
      });
    });
};

// Retrieve all Tqss from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tqs.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tqss."
      });
    });
};

// Find a single Tqs with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tqs.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tqs with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tqs with id=" + id });
    });
};

// Update a Tqs by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Tqs.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tqs with id=${id}. Maybe Tqs was not found!`
        });
      } else res.send({ message: "Tqs was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tqs with id=" + id
      });
    });
};

// Delete a Tqs with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tqs.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tqs with id=${id}. Maybe Tqs was not found!`
        });
      } else {
        res.send({
          message: "Tqs was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tqs with id=" + id
      });
    });
};

// Delete all Tqss from the database.
exports.deleteAll = (req, res) => {
  Tqs.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tqss were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Tqss."
      });
    });
};

// Find all published Tqss
exports.findAllPublished = (req, res) => {
  Tqs.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tqss."
      });
    });
};
