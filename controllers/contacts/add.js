const { HttpError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Contact.create({ ...req.body, owner });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(201).json(data);
};

module.exports = {
  add: ctrlWrapper(add),
};
