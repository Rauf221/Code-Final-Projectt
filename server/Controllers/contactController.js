const Contact = require('../models/Contact');
const asyncHandler = require('express-async-handler');

exports.createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  try {
    const contact = await Contact.create({
      name,
      email,
      phoneNumber,
      message
    });

    res.status(201).json({
      status: 'success',
      message: 'Contact submission received successfully',
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

exports.getAllContacts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;

  const contacts = await Contact.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skipIndex);

  const total = await Contact.countDocuments();

  res.status(200).json({
    status: 'success',
    count: contacts.length,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: contacts
  });
});

exports.getSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({
      status: 'error',
      message: 'Contact not found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: contact
  });
});

exports.updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!contact) {
    return res.status(404).json({
      status: 'error',
      message: 'Contact not found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: contact
  });
});

exports.deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    return res.status(404).json({
      status: 'error',
      message: 'Contact not found'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});