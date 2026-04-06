const express = require('express');
const LoanController = require('../controllers/LoanController');
const validateRequest = require('../middleware/validateRequest');
const { loanValidation } = require('../validations/schemas');

const router = express.Router();

router.get('/', LoanController.getAll);
router.get('/:id', LoanController.getById);
router.post('/', validateRequest(loanValidation.create), LoanController.borrow);
router.put('/:id/return', LoanController.returnBook);
router.get('/member/:memberId', LoanController.getMemberLoans);

module.exports = router;
