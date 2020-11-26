const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

// -----roles----//
// user: no permissions //
// admin: all permissions //

const UserSchema = new Schema({
  role: { type: String, require: true, default: "user" },
  username: { type: String,  },
  email: { type: String, unique: true },
  password: { type: String},
  FCMtoken: { type: String },
  date: { type: Date, default: Date.now },
});

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
