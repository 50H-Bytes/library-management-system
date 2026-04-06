const { Reservation, BookCopy, Member } = require('../models');

class ReservationService {
  async getAllReservations() {
    return await Reservation.findAll({
      include: [
        { association: 'member' },
        { association: 'copy', include: 'book' }
      ]
    });
  }

  async getReservationById(reservationId) {
    const reservation = await Reservation.findByPk(reservationId, {
      include: [
        { association: 'member' },
        { association: 'copy', include: 'book' }
      ]
    });
    if (!reservation) throw new Error('Reservation not found');
    return reservation;
  }

  async createReservation(data) {
    const member = await Member.findByPk(data.memberId);
    if (!member) throw new Error('Member not found');

    const copy = await BookCopy.findByPk(data.copyId);
    if (!copy) throw new Error('Copy not found');

    // Set expiration to 7 days from now if not provided
    const expiresAt = data.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return await Reservation.create({
      copyId: data.copyId,
      memberId: data.memberId,
      expiresAt
    });
  }

  async cancelReservation(reservationId) {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) throw new Error('Reservation not found');
    if (reservation.status !== 'active') throw new Error('Reservation is not active');

    return await reservation.update({ status: 'cancelled' });
  }

  async getMemberReservations(memberId) {
    return await Reservation.findAll({
      where: { memberId },
      include: [
        { association: 'member' },
        { association: 'copy', include: 'book' }
      ]
    });
  }
}

module.exports = new ReservationService();
