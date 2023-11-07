const { Schema, model } = require("mongoose");

const tokenSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "userShema" },
  token: { type: String, required: true },
});

const Token = model("token", tokenSchema);

module.exports = Token;
