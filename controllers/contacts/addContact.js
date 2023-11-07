const Contact = require("../../models/contacts/index");

const addContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
