const { HttpError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndRemove(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json({ message: "Delete Success" });
};

module.exports = {
  deleteById: ctrlWrapper(deleteById),
};
