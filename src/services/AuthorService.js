const { Author } = require('../models');

class AuthorService {
  async getAllAuthors() {
    return await Author.findAll({
      include: [{ association: 'books', through: { attributes: [] } }]
    });
  }

  async getAuthorById(authorId) {
    const author = await Author.findByPk(authorId, {
      include: [{ association: 'books', through: { attributes: [] } }]
    });
    if (!author) throw new Error('Author not found');
    return author;
  }

  async createAuthor(data) {
    return await Author.create(data);
  }

  async updateAuthor(authorId, data) {
    const author = await Author.findByPk(authorId);
    if (!author) throw new Error('Author not found');
    return await author.update(data);
  }

  async deleteAuthor(authorId) {
    const author = await Author.findByPk(authorId);
    if (!author) throw new Error('Author not found');
    await author.destroy();
  }
}

module.exports = new AuthorService();
