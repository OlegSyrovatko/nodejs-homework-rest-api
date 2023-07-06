// const contacts = require("../models/.contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact } = require("../models/contact");

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

const getById = async (req, res) => {
  const { id } = req.params;
  // const data = await Contact.findOne({ _id: id });
  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Contact.create({ ...req.body, owner });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(201).json(data);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(201).json(data);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndRemove(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json({ message: "Delete Success" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
