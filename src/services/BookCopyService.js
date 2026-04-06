const { BookCopy, Book, Loan, Reservation } = require('../models');

class BookCopyService {
  async getAllCopies() {
    return await BookCopy.findAll({
      include: ['book', 'loans', 'reservations']
    });
  }

  async getCopyById(copyId) {
    const copy = await BookCopy.findByPk(copyId, {
      include: ['book', 'loans', 'reservations']
    });
    if (!copy) throw new Error('Copy not found');
    return copy;
  }

  async createCopy(data) {
    const book = await Book.findByPk(data.bookId);
    if (!book) throw new Error('Book not found');
    return await BookCopy.create(data);
  }

  async updateCopy(copyId, data) {
    const copy = await BookCopy.findByPk(copyId);
    if (!copy) throw new Error('Copy not found');
    return await copy.update(data);
  }

  async deleteCopy(copyId) {
    const copy = await BookCopy.findByPk(copyId);
    if (!copy) throw new Error('Copy not found');
    await copy.destroy();
  }

  async getAvailableCopies(bookId) {
    return await BookCopy.findAll({
      where: { bookId, status: 'available' },
      include: 'book'
    });
  }
}

module.exports = new BookCopyService();
