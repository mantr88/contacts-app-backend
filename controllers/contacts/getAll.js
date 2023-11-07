const Contact = require("../../models/contacts/index");

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    if (req.query.favorite) {
      const favorite = req.query.favorite === "true";
      const allFavoriteContacts = await Contact.find({ owner, favorite }, "", {
        skip,
        limit,
      }).populate("owner", "email");

      res.status(200).json(allFavoriteContacts);
    }

    const allContacts = await Contact.find({ owner }, "", {
      skip,
      limit,
    }).populate("owner", "email");
    return res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
