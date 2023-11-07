const Contact = require("../../models/contacts/index");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    if (!req.body) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
