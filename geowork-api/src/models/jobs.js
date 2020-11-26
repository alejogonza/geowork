const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema({
  title: { type: String, require: true },
  pay: { type: String, require: true },
  description: { type: String, require: true },
  coords: { type: Object, require: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
