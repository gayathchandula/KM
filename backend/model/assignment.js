let mongoose = require("mongoose");

let Assignment = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  teacher: { type: String, required: true },
  class: { type: String, required: true },
  file: { type: String, required: true },
});

module.exports = mongoose.model("assignment", Assignment);
