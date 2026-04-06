const express = require('express');
const BookCopyController = require('../controllers/BookCopyController');
const validateRequest = require('../middleware/validateRequest');
const { bookCopyValidation } = require('../validations/schemas');

const router = express.Router();

router.get('/', BookCopyController.getAll);
router.get('/:id', BookCopyController.getById);
router.post('/', validateRequest(bookCopyValidation.create), BookCopyController.create);
router.put('/:id', validateRequest(bookCopyValidation.update), BookCopyController.update);
router.delete('/:id', BookCopyController.delete);
router.get('/book/:bookId/available', BookCopyController.getAvailable);

module.exports = router;
