const { HttpError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { id } = req.params;
  // const data = await Contact.findOne({ _id: id });
  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
