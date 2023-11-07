const Joi = require("joi");

const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = updateFavorite;
