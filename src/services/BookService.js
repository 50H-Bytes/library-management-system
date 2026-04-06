const { Book, Author, Category } = require('../models');

class BookService {
  async getAllBooks() {
    return await Book.findAll({
      include: [
        { association: 'authors', through: { attributes: [] } },
        { association: 'categories', through: { attributes: [] } },
        'copies'
      ]
    });
  }

  async getBookById(bookId) {
    const book = await Book.findByPk(bookId, {
      include: [
        { association: 'authors', through: { attributes: [] } },
        { association: 'categories', through: { attributes: [] } },
        'copies'
      ]
    });
    if (!book) throw new Error('Book not found');
    return book;
  }

  async createBook(data) {
    return await Book.create(data);
  }

  async updateBook(bookId, data) {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error('Book not found');
    return await book.update(data);
  }

  async deleteBook(bookId) {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error('Book not found');
    await book.destroy();
  }

  async addAuthorToBook(bookId, authorId) {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error('Book not found');
    const author = await Author.findByPk(authorId);
    if (!author) throw new Error('Author not found');
    await book.addAuthor(author);
  }

  async addCategoryToBook(bookId, categoryId) {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error('Book not found');
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error('Category not found');
    await book.addCategory(category);
  }
}

module.exports = new BookService();
