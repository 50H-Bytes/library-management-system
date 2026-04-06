# Library Management System Backend

## Project Structure

```
src/
├── config/
│   └── database.js        # Database connection setup
├── models/
│   ├── Member.js
│   ├── Book.js
│   ├── BookCopy.js
│   ├── Author.js
│   ├── Category.js
│   ├── BookAuthor.js
│   ├── BookCategory.js
│   ├── Loan.js
│   ├── Reservation.js
│   └── index.js           # Models and associations
├── controllers/
│   ├── MemberController.js
│   ├── BookController.js
│   ├── BookCopyController.js
│   ├── AuthorController.js
│   ├── CategoryController.js
│   ├── LoanController.js
│   └── ReservationController.js
├── services/
│   ├── MemberService.js
│   ├── BookService.js
│   ├── BookCopyService.js
│   ├── AuthorService.js
│   ├── CategoryService.js
│   ├── LoanService.js
│   └── ReservationService.js
├── routes/
│   ├── members.js
│   ├── books.js
│   ├── copies.js
│   ├── authors.js
│   ├── categories.js
│   ├── loans.js
│   └── reservations.js
├── middleware/
│   ├── errorHandler.js
│   └── validateRequest.js
├── validations/
│   └── schemas.js
└── index.js               # Main app file

migrations/
└── 20240101120000-create-all-tables.js

.env.example
.sequelizerc
package.json
```

## Setup Instructions

### 1. Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

Create a PostgreSQL database:

```bash
createdb library_management
```

Or using psql:

```bash
psql -U postgres
CREATE DATABASE library_management;
```

### 4. Environment Configuration

Copy .env.example to .env and update with your database credentials:

```bash
cp .env.example .env
```

Edit .env:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=library_management
PORT=3000
NODE_ENV=development
```

### 5. Run Migrations

Create database tables:

```bash
npm run db:migrate
```

### 6. Start the Server

Development mode (with auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Books
- `GET /api/books` - Get all books with authors and categories
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `POST /api/books/:bookId/authors` - Add author to book
- `POST /api/books/:bookId/categories` - Add category to book

### Book Copies
- `GET /api/copies` - Get all copies
- `GET /api/copies/:id` - Get copy by ID
- `POST /api/copies` - Create copy
- `PUT /api/copies/:id` - Update copy
- `DELETE /api/copies/:id` - Delete copy
- `GET /api/copies/book/:bookId/available` - Get available copies for book

### Authors
- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get author by ID
- `POST /api/authors` - Create author
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author

### Categories
- `GET /api/categories` - Get all categories (with hierarchy)
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Loans
- `GET /api/loans` - Get all loans
- `GET /api/loans/:id` - Get loan by ID
- `POST /api/loans` - Borrow a book (creates loan, updates copy status)
- `PUT /api/loans/:id/return` - Return a book (calculates fine if overdue)
- `GET /api/loans/member/:memberId` - Get member's loans

### Reservations
- `GET /api/reservations` - Get all reservations
- `GET /api/reservations/:id` - Get reservation by ID
- `POST /api/reservations` - Reserve a book
- `PUT /api/reservations/:id/cancel` - Cancel reservation
- `GET /api/reservations/member/:memberId` - Get member's reservations

## Example API Requests

### 1. Create Member

```bash
curl -X POST http://localhost:3000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
  }'
```

### 2. Create Book

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "isbn": "978-0-06-112008-4",
    "title": "To Kill a Mockingbird",
    "pubYear": 1960,
    "publisher": "J.B. Lippincott",
    "language": "English"
  }'
```

### 3. Create Author

```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Harper",
    "lastName": "Lee"
  }'
```

### 4. Add Author to Book

```bash
curl -X POST http://localhost:3000/api/books/1/authors \
  -H "Content-Type: application/json" \
  -d '{
    "authorId": 1
  }'
```

### 5. Create Category

```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fiction"
  }'
```

### 6. Add Category to Book

```bash
curl -X POST http://localhost:3000/api/books/1/categories \
  -H "Content-Type: application/json" \
  -d '{
    "categoryId": 1
  }'
```

### 7. Create Book Copy

```bash
curl -X POST http://localhost:3000/api/copies \
  -H "Content-Type: application/json" \
  -d '{
    "bookId": 1,
    "condition": "excellent",
    "status": "available"
  }'
```

### 8. Borrow a Book (Create Loan)

```bash
curl -X POST http://localhost:3000/api/loans \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": 1,
    "copyId": 1,
    "dueDate": "2024-02-15"
  }'
```

### 9. Return a Book

```bash
curl -X PUT http://localhost:3000/api/loans/1/return \
  -H "Content-Type: application/json"
```

### 10. Reserve a Book

```bash
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": 1,
    "copyId": 1,
    "expiresAt": "2024-02-20"
  }'
```

### 11. Cancel Reservation

```bash
curl -X PUT http://localhost:3000/api/reservations/1/cancel \
  -H "Content-Type: application/json"
```

### 12. Get Member with Loans and Reservations

```bash
curl http://localhost:3000/api/members/1
```

### 13. Get Book with Authors and Categories

```bash
curl http://localhost:3000/api/books/1
```

## Error Handling

All errors return a consistent response format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field error message"
    }
  ]
}
```

## Database Relationships

- **Books ↔ BookCopies**: One-to-Many
- **Books ↔ Authors**: Many-to-Many (via BookAuthor)
- **Books ↔ Categories**: Many-to-Many (via BookCategory)
- **Members ↔ Loans**: One-to-Many
- **Members ↔ Reservations**: One-to-Many
- **BookCopies ↔ Loans**: One-to-Many
- **BookCopies ↔ Reservations**: One-to-Many
- **Categories ↔ Categories**: Self-referential (hierarchical)

## Business Logic

### Loan Creation
- Member must be active
- Copy must be available
- Copy status changes to "loaned"
- Due date is required

### Loan Return
- Fine calculated per day overdue (2 per day)
- Overdue loans marked with "overdue" status
- Copy status reverts to "available"

### Reservations
- Expires after 7 days by default
- Can be cancelled by member
- Fulfillment status reserved for admin use

## Notes for Frontend Integration

- All endpoints require proper Content-Type: application/json
- Validation errors return 400 status
- Not found errors return 404 status  
- Success responses have success: true
- Include member.status (active/inactive/suspended) before loaning
- Update copy.status after loan/return operations
- Use pagination for large datasets (can be added later)
- Authentication not included - add JWT middleware as needed

## Notes for Future Extension

- Add JWT authentication middleware
- Add pagination and filtering
- Add fine calculation and payment system
- Add book reservation queue system
- Add email notifications
- Add search/filter functionality
- Add audit logging
