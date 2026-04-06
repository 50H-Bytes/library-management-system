const express = require('express');
const AuthorController = require('../controllers/AuthorController');
const validateRequest = require('../middleware/validateRequest');
const { authorValidation } = require('../validations/schemas');

const router = express.Router();

router.get('/', AuthorController.getAll);
router.get('/:id', AuthorController.getById);
router.post('/', validateRequest(authorValidation.create), AuthorController.create);
router.put('/:id', validateRequest(authorValidation.update), AuthorController.update);
router.delete('/:id', AuthorController.delete);

module.exports = router;
