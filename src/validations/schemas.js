const Joi = require('joi');

const memberValidation = {
  create: Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9\-\+\s]{10,20}$/).required()
  }),
  update: Joi.object({
    firstName: Joi.string().min(2).max(100),
    lastName: Joi.string().min(2).max(100),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[0-9\-\+\s]{10,20}$/),
    status: Joi.string().valid('active', 'inactive', 'suspended'),
    membershipEnd: Joi.date()
  })
};

const bookValidation = {
  create: Joi.object({
    isbn: Joi.string().required(),
    title: Joi.string().min(2).max(255).required(),
    pubYear: Joi.number().integer().min(1000).max(new Date().getFullYear()),
    publisher: Joi.string().max(255),
    language: Joi.string().max(50)
  }),
  update: Joi.object({
    isbn: Joi.string(),
    title: Joi.string().min(2).max(255),
    pubYear: Joi.number().integer().min(1000).max(new Date().getFullYear()),
    publisher: Joi.string().max(255),
    language: Joi.string().max(50)
  })
};

const bookCopyValidation = {
  create: Joi.object({
    bookId: Joi.number().integer().required(),
    condition: Joi.string().valid('excellent', 'good', 'fair', 'poor').required(),
    status: Joi.string().valid('available', 'loaned', 'reserved', 'damaged')
  }),
  update: Joi.object({
    condition: Joi.string().valid('excellent', 'good', 'fair', 'poor'),
    status: Joi.string().valid('available', 'loaned', 'reserved', 'damaged')
  })
};

const authorValidation = {
  create: Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required()
  }),
  update: Joi.object({
    firstName: Joi.string().min(2).max(100),
    lastName: Joi.string().min(2).max(100)
  })
};

const categoryValidation = {
  create: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    parentId: Joi.number().integer().allow(null)
  }),
  update: Joi.object({
    name: Joi.string().min(2).max(100),
    parentId: Joi.number().integer().allow(null)
  })
};

const loanValidation = {
  create: Joi.object({
    copyId: Joi.number().integer().required(),
    memberId: Joi.number().integer().required(),
    dueDate: Joi.date().required()
  })
};

const reservationValidation = {
  create: Joi.object({
    copyId: Joi.number().integer().required(),
    memberId: Joi.number().integer().required(),
    expiresAt: Joi.date()
  })
};

module.exports = {
  memberValidation,
  bookValidation,
  bookCopyValidation,
  authorValidation,
  categoryValidation,
  loanValidation,
  reservationValidation
};
