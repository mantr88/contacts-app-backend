const Contact = require("../../models/contacts/index");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
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

module.exports = updateContact;
