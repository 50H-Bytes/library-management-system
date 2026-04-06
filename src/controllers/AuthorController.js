const AuthorService = require('../services/AuthorService');

class AuthorController {
  async getAll(req, res, next) {
    try {
      const authors = await AuthorService.getAllAuthors();
      res.json({ success: true, data: authors });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const author = await AuthorService.getAuthorById(req.params.id);
      res.json({ success: true, data: author });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const author = await AuthorService.createAuthor(req.validated);
      res.status(201).json({ success: true, data: author });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const author = await AuthorService.updateAuthor(req.params.id, req.validated);
      res.json({ success: true, data: author });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await AuthorService.deleteAuthor(req.params.id);
      res.json({ success: true, message: 'Author deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthorController();
