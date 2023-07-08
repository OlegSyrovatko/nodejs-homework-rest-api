const { HttpError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };
  if (favorite) {
    query.favorite = favorite;
  }
  const data = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
