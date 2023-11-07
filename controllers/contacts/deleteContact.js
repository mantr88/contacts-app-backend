const Contact = require("../../models/contacts/index");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
