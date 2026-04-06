const express = require('express');
const BookController = require('../controllers/BookController');
const validateRequest = require('../middleware/validateRequest');
const { bookValidation } = require('../validations/schemas');

const router = express.Router();

router.get('/', BookController.getAll);
router.get('/:id', BookController.getById);
router.post('/', validateRequest(bookValidation.create), BookController.create);
router.put('/:id', validateRequest(bookValidation.update), BookController.update);
router.delete('/:id', BookController.delete);
router.post('/:bookId/authors', BookController.addAuthor);
router.post('/:bookId/categories', BookController.addCategory);

module.exports = router;
