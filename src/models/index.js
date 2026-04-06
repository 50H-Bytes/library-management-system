const Member = require('./Member');
const Book = require('./Book');
const BookCopy = require('./BookCopy');
const Author = require('./Author');
const Category = require('./Category');
const BookAuthor = require('./BookAuthor');
const BookCategory = require('./BookCategory');
const Loan = require('./Loan');
const Reservation = require('./Reservation');

// Book associations
Book.hasMany(BookCopy, { foreignKey: 'bookId', as: 'copies' });
BookCopy.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

// Many-to-many: Books <-> Authors
Book.belongsToMany(Author, { through: BookAuthor, foreignKey: 'bookId', otherKey: 'authorId', as: 'authors' });
Author.belongsToMany(Book, { through: BookAuthor, foreignKey: 'authorId', otherKey: 'bookId', as: 'books' });

// Many-to-many: Books <-> Categories
Book.belongsToMany(Category, { through: BookCategory, foreignKey: 'bookId', otherKey: 'categoryId', as: 'categories' });
Category.belongsToMany(Book, { through: BookCategory, foreignKey: 'categoryId', otherKey: 'bookId', as: 'books' });

// Category hierarchical relationship
Category.hasMany(Category, { foreignKey: 'parentId', as: 'subCategories' });
Category.belongsTo(Category, { foreignKey: 'parentId', as: 'parent' });

// Loan associations
Member.hasMany(Loan, { foreignKey: 'memberId', as: 'loans' });
Loan.belongsTo(Member, { foreignKey: 'memberId', as: 'member' });

BookCopy.hasMany(Loan, { foreignKey: 'copyId', as: 'loans' });
Loan.belongsTo(BookCopy, { foreignKey: 'copyId', as: 'copy' });

// Reservation associations
Member.hasMany(Reservation, { foreignKey: 'memberId', as: 'reservations' });
Reservation.belongsTo(Member, { foreignKey: 'memberId', as: 'member' });

BookCopy.hasMany(Reservation, { foreignKey: 'copyId', as: 'reservations' });
Reservation.belongsTo(BookCopy, { foreignKey: 'copyId', as: 'copy' });

module.exports = {
  Member,
  Book,
  BookCopy,
  Author,
  Category,
  BookAuthor,
  BookCategory,
  Loan,
  Reservation
};
