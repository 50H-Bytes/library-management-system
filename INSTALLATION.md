## 📖 Complete Project Setup Guide

This guide walks you through setting up and running your Library Management System Backend.

---

## Step 1: Install Node.js Dependencies

```bash
npm install
```

This installs all required packages:
- Express.js - Web framework
- Sequelize - ORM for PostgreSQL
- Joi - Input validation
- Helmet - Security headers
- CORS - Cross-origin support
- dotenv - Environment variables

---

## Step 2: Create PostgreSQL Database

### Option A: Using createdb command
```bash
createdb library_management
```

### Option B: Using psql
```bash
psql -U postgres
CREATE DATABASE library_management;
\q
```

---

## Step 3: Create .env File

Copy the example and configure your database:

```bash
cp .env.example .env
```

Edit `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=library_management
PORT=3000
NODE_ENV=development
```

**⚠️ Important:** 
- Make sure DB credentials match your PostgreSQL setup
- Never commit .env to version control (already in .gitignore)

---

## Step 4: Run Database Migrations

Create all tables in the database:

```bash
npm run db:migrate
```

This creates 9 tables with proper relationships:
- members
- books
- book_copies
- authors
- book_authors
- categories
- book_categories
- loans
- reservations

---

## Step 5: Start the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

You should see:
```
Database connected successfully
Server running on port 3000
```

Visit: `http://localhost:3000/health`

Expected response:
```json
{"status":"OK"}
```

---

## Step 6: Test the API

### Using curl:

**Create a Member:**
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

**Create a Book:**
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

### Using Postman:

1. Import `postman-collection.json` into Postman
2. Update variable `{{baseUrl}}` to `http://localhost:3000`
3. Test all endpoints from the collection

---

## Project Structure Overview

```
library-management-system/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── models/                  # Sequelize models
│   │   ├── Member.js
│   │   ├── Book.js
│   │   ├── BookCopy.js
│   │   ├── Author.js
│   │   ├── Category.js
│   │   ├── Loan.js
│   │   ├── Reservation.js
│   │   ├── BookAuthor.js       # Many-to-many junction
│   │   ├── BookCategory.js     # Many-to-many junction
│   │   └── index.js            # Model associations
│   ├── controllers/             # Request handlers
│   │   ├── MemberController.js
│   │   ├── BookController.js
│   │   ├── BookCopyController.js
│   │   ├── AuthorController.js
│   │   ├── CategoryController.js
│   │   ├── LoanController.js
│   │   └── ReservationController.js
│   ├── services/                # Business logic
│   │   ├── MemberService.js
│   │   ├── BookService.js
│   │   ├── BookCopyService.js
│   │   ├── AuthorService.js
│   │   ├── CategoryService.js
│   │   ├── LoanService.js
│   │   └── ReservationService.js
│   ├── routes/                  # API routes
│   │   ├── members.js
│   │   ├── books.js
│   │   ├── copies.js
│   │   ├── authors.js
│   │   ├── categories.js
│   │   ├── loans.js
│   │   └── reservations.js
│   ├── middleware/              # Express middleware
│   │   ├── errorHandler.js     # Centralized error handling
│   │   └── validateRequest.js  # Input validation
│   ├── validations/
│   │   └── schemas.js           # Joi validation schemas
│   └── index.js                 # Main app entry point
├── migrations/
│   └── 20240101120000-create-all-tables.js
├── .env.example
├── .sequelizerc
├── package.json
├── postman-collection.json
├── README.md
└── SETUP.md
```

---

## API Architecture

### Clean Separation of Concerns:

1. **Routes** → Handle HTTP requests
2. **Controllers** → Orchestrate requests/responses
3. **Services** → Contain business logic
4. **Models** → Define database structure

**Example Flow:**
```
Client Request
    ↓
Route Handler
    ↓
Controller Method
    ↓
Service Method (validation & logic)
    ↓
Sequelize Model (database)
    ↓
Response
```

---

## Key Features

### ✅ Complete CRUD Operations
Every entity (Members, Books, Authors, etc.) supports:
- Create (POST)
- Read (GET)
- Update (PUT)
- Delete (DELETE)

### ✅ Business Logic
- **Loan Borrowing:** Validates member status & copy availability, updates statuses
- **Loan Return:** Calculates overdue fines (2 per day), updates copy status
- **Reservations:** Auto-expires after 7 days, cancellation support
- **Many-to-Many:** Books linked to Authors and Categories

### ✅ Validation
- Email format validation
- Phone number format
- Enum validations (status, condition)
- Unique constraints (ISBN, email)

### ✅ Error Handling
Consistent error responses with:
- HTTP status codes
- Error descriptions
- Field-specific errors

### ✅ Hierarchical Categories
Categories can have parent categories (tree structure)

---

## Database Relationships

```
Members
  ├─ 1:N → Loans
  └─ 1:N → Reservations

Books
  ├─ 1:N → BookCopies
  ├─ M:N → Authors (through BookAuthor)
  ├─ M:N → Categories (through BookCategory)
  └─ 1:N → BookCopies
    ├─ 1:N → Loans
    └─ 1:N → Reservations

Categories
  ├─ 1:N → SubCategories (self-referential)
  └─ M:N → Books (through BookCategory)

Authors
  └─ M:N → Books (through BookAuthor)
```

---

## Common Tasks

### Get All Available Copies for a Book
```bash
curl http://localhost:3000/api/copies/book/1/available
```

### Get Member's Loans
```bash
curl http://localhost:3000/api/loans/member/1
```

### Get Member's Reservations
```bash
curl http://localhost:3000/api/reservations/member/1
```

### View Member with Associated Data
```bash
curl http://localhost:3000/api/members/1
```
Returns: member + loans + reservations

### View Book with Full Details
```bash
curl http://localhost:3000/api/books/1
```
Returns: book + authors + categories + copies

---

## Validation Examples

### Creating a Member - Valid:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-1234"
}
```

### Creating a Member - Invalid (Returns 400):
```json
{
  "firstName": "J",           // Too short
  "email": "invalid-email",   // Invalid email format
  "phone": "123"              // Too short
}
```

---

## Testing Workflow

### 1. Create Test Data
- Create 2-3 members
- Create 3-4 books
- Create authors
- Create categories
- Add relationships (authors to books, categories to books)
- Create book copies

### 2. Test Core Operations
- Get all resources
- Get individual resources
- Update resources
- Test validations

### 3. Test Loaning System
- Create loan (borrow)
- Check copy status (should be "loaned")
- Return loan
- Check fine calculation

### 4. Test Reservations
- Create reservation
- Get member's reservations
- Cancel reservation

---

## Troubleshooting

### Database Connection Error
```
Error: Failed to connect to database
```
**Fix:** Check .env file credentials match your PostgreSQL setup

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Fix:** Change PORT in .env or kill existing process

### Migration Error
```
Error: table "members" already exists
```
**Fix:** Database already has tables. Run migrations only once.

### Validation Error
```
{
  "success": false,
  "message": "Validation error"
}
```
**Fix:** Check request body matches schema. See SETUP.md for examples.

---

## Next Steps

### For Frontend Integration:
- Import HTTP client library (axios, fetch)
- Set base URL to `http://localhost:3000/api`
- Handle response format: `{ success, data, message }`

### For Production:
- Add JWT authentication
- Add rate limiting
- Add request logging
- Add database backups
- Use environment-specific configs
- Add pagination/filtering
- Add search functionality

### For Enhancement:
- Add fine payment system
- Add email notifications
- Add book availability alerts
- Add borrowing history
- Add recommendation engine

---

## Files Summary

| File | Purpose |
|------|---------|
| `src/index.js` | Express app setup & server start |
| `src/config/database.js` | Database connection |
| `src/models/*` | Data models & definitions |
| `src/services/*` | Business logic |
| `src/controllers/*` | Request handlers |
| `src/routes/*` | API endpoints |
| `src/middleware/*` | Error handling & validation |
| `.env.example` | Environment template |
| `migrations/*` | Database schema |
| `package.json` | Dependencies & scripts |
| `postman-collection.json` | API testing collection |

---

## Ready to Go! 🚀

Your backend is fully set up with:
- ✅ All models and relationships
- ✅ All CRUD endpoints
- ✅ Business logic (loans, reservations)
- ✅ Input validation
- ✅ Error handling
- ✅ Clean architecture
- ✅ API documentation

**Start server:** `npm run dev`
**Test API:** Open postman-collection.json
**See docs:** Read SETUP.md for detailed API reference
