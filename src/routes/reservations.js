const express = require('express');
const ReservationController = require('../controllers/ReservationController');
const validateRequest = require('../middleware/validateRequest');
const { reservationValidation } = require('../validations/schemas');

const router = express.Router();

router.get('/', ReservationController.getAll);
router.get('/:id', ReservationController.getById);
router.post('/', validateRequest(reservationValidation.create), ReservationController.create);
router.put('/:id/cancel', ReservationController.cancel);
router.get('/member/:memberId', ReservationController.getMemberReservations);

module.exports = router;
