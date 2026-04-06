const BookService = require('../services/BookService');

class BookController {
  async getAll(req, res, next) {
    try {
      const books = await BookService.getAllBooks();
      res.json({ success: true, data: books });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const book = await BookService.getBookById(req.params.id);
      res.json({ success: true, data: book });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const book = await BookService.createBook(req.validated);
      res.status(201).json({ success: true, data: book });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const book = await BookService.updateBook(req.params.id, req.validated);
      res.json({ success: true, data: book });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await BookService.deleteBook(req.params.id);
      res.json({ success: true, message: 'Book deleted' });
    } catch (error) {
      next(error);
    }
  }

  async addAuthor(req, res, next) {
    try {
      await BookService.addAuthorToBook(req.params.bookId, req.body.authorId);
      res.json({ success: true, message: 'Author added to book' });
    } catch (error) {
      next(error);
    }
  }

  async addCategory(req, res, next) {
    try {
      await BookService.addCategoryToBook(req.params.bookId, req.body.categoryId);
      res.json({ success: true, message: 'Category added to book' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookController();
