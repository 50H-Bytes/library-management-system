const express = require('express');
const MemberController = require('../controllers/MemberController');
const validateRequest = require('../middleware/validateRequest');
const { memberValidation } = require('../validations/schemas');

const router = express.Router();

router.get('/', MemberController.getAll);
router.get('/:id', MemberController.getById);
router.post('/', validateRequest(memberValidation.create), MemberController.create);
router.put('/:id', validateRequest(memberValidation.update), MemberController.update);
router.delete('/:id', MemberController.delete);

module.exports = router;
