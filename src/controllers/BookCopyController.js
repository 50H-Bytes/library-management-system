const BookCopyService = require('../services/BookCopyService');

class BookCopyController {
  async getAll(req, res, next) {
    try {
      const copies = await BookCopyService.getAllCopies();
      res.json({ success: true, data: copies });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const copy = await BookCopyService.getCopyById(req.params.id);
      res.json({ success: true, data: copy });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const copy = await BookCopyService.createCopy(req.validated);
      res.status(201).json({ success: true, data: copy });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const copy = await BookCopyService.updateCopy(req.params.id, req.validated);
      res.json({ success: true, data: copy });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await BookCopyService.deleteCopy(req.params.id);
      res.json({ success: true, message: 'Copy deleted' });
    } catch (error) {
      next(error);
    }
  }

  async getAvailable(req, res, next) {
    try {
      const copies = await BookCopyService.getAvailableCopies(req.params.bookId);
      res.json({ success: true, data: copies });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookCopyController();
