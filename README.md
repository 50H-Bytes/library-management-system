# Online Library Management System - Backend

A complete REST API backend for an online library management system built with Node.js, Express, and PostgreSQL using Sequelize ORM.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create database:**
   ```bash
   createdb library_management
   ```

3. **Setup environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

5. **Start server:**
   ```bash
   npm run dev
   ```

Server will be available at `http://localhost:3000`

## 📋 API Endpoints

### Members
- `GET /api/members` - List all members
- `POST /api/members` - Create member
- `GET /api/members/:id` - Get member details
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Books  
- `GET /api/books` - List all books
- `POST /api/books` - Create book
- `GET /api/books/:id` - Get book with authors & categories
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `POST /api/books/:bookId/authors` - Add author to book
- `POST /api/books/:bookId/categories` - Add category to book

### Book Copies
- `GET /api/copies` - List all copies
- `POST /api/copies` - Create copy
- `GET /api/copies/:id` - Get copy details
- `PUT /api/copies/:id` - Update copy
- `GET /api/copies/book/:bookId/available` - Get available copies

### Authors
- `GET /api/authors` - List all authors
- `POST /api/authors` - Create author
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Loans (Borrow/Return)
- `GET /api/loans` - List all loans
- `POST /api/loans` - Borrow book (creates loan)
- `GET /api/loans/:id` - Get loan details
- `PUT /api/loans/:id/return` - Return book (calculates fine if overdue)
- `GET /api/loans/member/:memberId` - Get member's loans

### Reservations
- `GET /api/reservations` - List all reservations
- `POST /api/reservations` - Reserve book
- `GET /api/reservations/:id` - Get reservation details
- `PUT /api/reservations/:id/cancel` - Cancel reservation
- `GET /api/reservations/member/:memberId` - Get member's reservations

## 📊 Database Schema

**Tables:**
- `members` - Library members
- `books` - Book catalog
- `book_copies` - Physical book copies
- `authors` - Book authors
- `book_authors` - Books-Authors relationship (many-to-many)
- `categories` - Book categories (hierarchical)
- `book_categories` - Books-Categories relationship (many-to-many)
- `loans` - Book loan records
- `reservations` - Book reservations

**Relationships:**
- Books → Copies (One-to-Many)
- Books ↔ Authors (Many-to-Many)
- Books ↔ Categories (Many-to-Many)
- Members → Loans (One-to-Many)
- Members → Reservations (One-to-Many)
- Copies → Loans (One-to-Many)
- Copies → Reservations (One-to-Many)

## 🛡️ Validation & Business Logic

**Member:**
- Email must be valid and unique
- Phone format validation (10-20 chars)

**Book:**
- ISBN must be unique
- Publication year between 1000 and current year

**Loan Creation:**
- Member must be active
- Copy must be available
- Automatically updates copy status to "loaned"

**Loan Return:**
- Calculates fine (2 per day if overdue)
- Updates copy status back to "available"
- Marks loan as "returned" or "overdue"

**Reservation:**
- Defaults to 7-day expiration
- Can only cancel active reservations

## 📚 Example Requests

### Create Member
```bash
curl -X POST http://localhost:3000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "555-1234"
  }'
```

### Borrow a Book
```bash
curl -X POST http://localhost:3000/api/loans \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": 1,
    "copyId": 1,
    "dueDate": "2024-02-15"
  }'
```

### Return a Book
```bash
curl -X PUT http://localhost:3000/api/loans/1/return \
  -H "Content-Type: application/json"
```

See [SETUP.md](SETUP.md) for complete API documentation and examples.

## 📁 Project Structure

```
src/
├── config/       # Database connection
├── models/       # Sequelize model definitions
├── controllers/  # Request handlers
├── services/     # Business logic
├── routes/       # API endpoints
├── middleware/   # Error handling, validation
└── validations/  # Input validation schemas

migrations/      # Database migrations
postman-collection.json  # Postman API collection
```

## 🔧 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Validation:** Joi
- **Security:** Helmet, CORS

## 📋 Scripts

```bash
npm run dev          # Development mode (auto-reload)
npm start            # Production mode
npm run db:migrate   # Run database migrations
npm run db:reset     # Drop, create, and migrate database
```

## 🚫 Error Handling

All errors return consistent format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error"
    }
  ]
}
```

## ✅ Ready for Integration

This backend is organized and clean for easy integration with your frontend and database team:

- **Clean Architecture** - Separate concerns (models, services, controllers, routes)
- **Validation** - Input validation before database operations
- **Error Handling** - Consistent error responses
- **Models** - All relationships properly defined
- **Services** - Business logic isolated from controllers
- **Comments** - Only on important logic, not cluttered
- **No Conflicts** - Clear separation makes integration smooth

## 📝 Notes

- No authentication included - add JWT middleware as needed
- Timestamps not enabled on most tables (as per schema)
- Database connection pooling configured
- Ready for pagination/filtering extensions
- Postman collection included for API testing

## 📖 Next Steps

1. Install database and run migrations
2. Test with Postman collection
3. Add JWT authentication
4. Connect frontend application
5. Deploy to production

---

For detailed setup instructions, see [SETUP.md](SETUP.md)
