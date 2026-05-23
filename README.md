# Contact Management API

A backend REST API built using **Node.js, Express, and MongoDB (Mongoose)** for managing contacts with full CRUD operations, pagination, filtering, validation, and security middleware.

---

## Features Implemented

### Core Features
- Create a new contact
- Get all contacts with pagination
- Get contact by ID
- Update contact by ID
- Soft delete contact (no permanent deletion)

### Advanced Features
- Pagination support (`page`, `limit`)
- Search contacts by name and email
- Filter contacts by status (active/inactive)
- Duplicate active email prevention
- Input validation using express-validator
- Centralized error handling
- Request logging using Morgan
- Input sanitization (NoSQL injection protection)
- Rate limiting to prevent abuse
- API Key authentication middleware
- Soft delete implementation (`deleted: true`)

---

## Technical Decisions

- Used **Express.js** for lightweight backend framework
- Used **MongoDB + Mongoose** for schema-based NoSQL design
- Implemented **manual DTO mapping** for clean API responses
- Used **middleware-based architecture** for scalability
- Used **soft delete instead of hard delete** for data safety
- Used **API key authentication instead of JWT** for simplicity
- Implemented **service-style controller separation**

---

## Limitations
-No JWT authentication (API key only)
-No role-based access control
-No unit/integration tests implemented
-No Docker setup
-MongoDB ID replaced with manual incremental ID
-Soft delete data still stored in database

----

 Time Spent

Approx. 1 days (already learned + implementation)

## Project Setup

### 1. Clone repository
```bash
git clone (https://github.com/Mohamed-529/Backend-contact)
npm install
npm run dev
