const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const validateRequest = require('../middleware/validateRequest');
const { categoryValidation } = require('../validations/schemas');

const router = express.Router();

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.post('/', validateRequest(categoryValidation.create), CategoryController.create);
router.put('/:id', validateRequest(categoryValidation.update), CategoryController.update);
router.delete('/:id', CategoryController.delete);

module.exports = router;
