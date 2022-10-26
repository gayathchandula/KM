let mongoose = require("mongoose");

let Class = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  teacher: { type: String, required: true },
  code: { type: String, min: 4, required: true },
});

module.exports = mongoose.model("class", Class);
