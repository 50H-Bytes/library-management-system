const ReservationService = require('../services/ReservationService');

class ReservationController {
  async getAll(req, res, next) {
    try {
      const reservations = await ReservationService.getAllReservations();
      res.json({ success: true, data: reservations });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const reservation = await ReservationService.getReservationById(req.params.id);
      res.json({ success: true, data: reservation });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const reservation = await ReservationService.createReservation(req.validated);
      res.status(201).json({ success: true, data: reservation });
    } catch (error) {
      next(error);
    }
  }

  async cancel(req, res, next) {
    try {
      const reservation = await ReservationService.cancelReservation(req.params.id);
      res.json({ success: true, data: reservation });
    } catch (error) {
      next(error);
    }
  }

  async getMemberReservations(req, res, next) {
    try {
      const reservations = await ReservationService.getMemberReservations(req.params.memberId);
      res.json({ success: true, data: reservations });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReservationController();
