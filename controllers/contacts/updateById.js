const { HttpError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateById = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(201).json(data);
};

module.exports = {
  updateById: ctrlWrapper(updateById),
};
