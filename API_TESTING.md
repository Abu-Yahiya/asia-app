# API Testing Guide

This document provides comprehensive testing instructions for all feature APIs in the Asia App.

## Test Environment Setup

All APIs are built with Node.js/Express using MongoDB for persistence. The base URL for all endpoints is:
```
http://localhost:3000/api
```

## Endpoints Overview

### 1. Packages API

#### GET /api/packages
Fetch all packages
```bash
curl http://localhost:3000/api/packages
```

#### POST /api/packages
Create a new package
```bash
curl -X POST http://localhost:3000/api/packages \
  -H "Content-Type: application/json" \
  -d '{
    "id": "pkg-001",
    "title": "Dubai Adventure",
    "location": "Dubai, UAE",
    "description": "3-day luxury tour",
    "image": "https://example.com/image.jpg",
    "price": 1500,
    "duration": "3 days",
    "groupSize": "2-4 people",
    "rating": 4.8,
    "highlights": ["Desert Safari", "Burj Khalifa", "Shopping"],
    "itinerary": [
      {"day": 1, "title": "Arrival", "description": "Arrive and settle in"},
      {"day": 2, "title": "Safari", "description": "Desert adventure"}
    ]
  }'
```

#### GET /api/packages/[id]
Get a specific package
```bash
curl http://localhost:3000/api/packages/YOUR_PACKAGE_ID
```

#### PUT /api/packages/[id]
Update a package
```bash
curl -X PUT http://localhost:3000/api/packages/YOUR_PACKAGE_ID \
  -H "Content-Type: application/json" \
  -d '{"price": 1800, "rating": 4.9}'
```

#### DELETE /api/packages/[id]
Delete a package
```bash
curl -X DELETE http://localhost:3000/api/packages/YOUR_PACKAGE_ID
```

---

### 2. Services API

#### GET /api/services
Fetch all services
```bash
curl http://localhost:3000/api/services
```

#### POST /api/services
Create a new service
```bash
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "visa-consultation",
    "title": "Visa Consultation",
    "description": "Expert visa assistance",
    "longDescription": "Get professional visa guidance",
    "duration": "1 hour",
    "features": ["Document review", "Interview prep"],
    "process": [
      {"step": 1, "title": "Initial Consultation", "description": "Discuss requirements"}
    ]
  }'
```

#### GET /api/services/[id], PUT, DELETE
Similar to packages endpoints above

---

### 3. Blog API

#### GET /api/blog
Fetch all blog posts
```bash
curl http://localhost:3000/api/blog
```

#### POST /api/blog
Create a blog post
```bash
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "id": "blog-001",
    "title": "Travel Tips",
    "slug": "travel-tips-2024",
    "description": "Essential travel advice",
    "content": "Full article content here...",
    "image": "https://example.com/image.jpg",
    "author": "John Doe",
    "category": "Travel Tips",
    "readTime": "5 min"
  }'
```

#### GET /api/blog/[id], PUT, DELETE
Similar to packages endpoints above

---

### 4. Appointments API

#### GET /api/appointments
Fetch all appointments
```bash
curl http://localhost:3000/api/appointments
```

#### POST /api/appointments
Create an appointment
```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Smith",
    "email": "john@example.com",
    "phone": "+1234567890",
    "service": "visa-consultation",
    "preferredDate": "2024-12-20",
    "preferredTime": "09:00 AM",
    "message": "Need urgent visa help",
    "status": "pending"
  }'
```

#### GET /api/appointments/[id], PUT, DELETE
Similar to packages endpoints above

---

### 5. Visa Countries API

#### GET /api/visa
Fetch all visa countries
```bash
curl http://localhost:3000/api/visa
```

#### POST /api/visa
Create a visa country record
```bash
curl -X POST http://localhost:3000/api/visa \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "japan",
    "name": "Japan",
    "flag": "🇯🇵",
    "processing": "5-7 days",
    "type": "Tourist Visa",
    "description": "Japanese visa information",
    "requirements": ["Valid passport", "Financial proof"],
    "documents": ["Passport", "Bank statements"],
    "fees": [{"type": "Single Entry", "amount": "Free"}],
    "tips": ["Submit detailed itinerary"]
  }'
```

#### GET /api/visa/[id], PUT, DELETE
Similar to packages endpoints above

---

### 6. Contacts API

#### GET /api/contacts
Fetch all contact messages
```bash
curl http://localhost:3000/api/contacts
```

#### POST /api/contacts
Create a contact message
```bash
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "I have a question about visa services",
    "status": "new"
  }'
```

#### GET /api/contacts/[id], PUT, DELETE
Similar to packages endpoints above

---

## Testing Checklist

- [ ] All GET requests return 200 status and data array
- [ ] All POST requests create data and return 201 status
- [ ] All PUT requests update data and return 200 status
- [ ] All DELETE requests remove data and return 200 status
- [ ] Missing required fields return 400 status
- [ ] Non-existent IDs return 404 status
- [ ] Invalid data types are rejected
- [ ] Duplicate unique fields are rejected
- [ ] Database connections work properly
- [ ] Error messages are descriptive

## Response Format

All APIs follow this response format:

Success (2xx):
```json
{
  "success": true,
  "data": { /* resource or array of resources */ }
}
```

Error (4xx/5xx):
```json
{
  "success": false,
  "message": "Error description"
}
```

## Notes

- Replace `YOUR_PACKAGE_ID` with actual MongoDB ObjectId
- All dates should be in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`
- All email addresses are automatically converted to lowercase
- Phone numbers must be at least 7 characters
- Passwords are automatically hashed using bcryptjs
