# Authentication Setup Guide

This guide explains the complete JWT-based authentication system implemented using MongoDB, Mongoose, and JSON Web Tokens.

## Overview

The authentication system includes:
- User registration (signup) with email, name, phone, and password
- User login with email and password
- JWT-based session management
- Role-based access control (admin vs user)
- Protected routes using middleware
- HttpOnly cookie-based token storage

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name

# JWT Configuration
JWT_SECRET=your-super-secret-key-min-32-characters-long
JWT_EXPIRES_IN=7d

# Node Environment
NODE_ENV=development
```

### Getting a MongoDB Connection String:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Navigate to "Databases" → "Connect"
4. Choose "Drivers" and copy the connection string
5. Replace `<username>`, `<password>`, and `<database_name>` with your values

## Database Schema

### User Model

```
- _id: ObjectId (auto-generated)
- name: String (required, max 50 characters)
- email: String (required, unique, validated)
- password: String (required, hashed with bcrypt, min 6 characters)
- phone: String (required)
- role: String (enum: 'admin' | 'user', default: 'user')
- createdAt: Date (auto-generated)
- updatedAt: Date (auto-generated)
```

## File Structure

```
lib/
├── auth/
│   ├── AuthContext.tsx       # Client-side auth context & hooks
│   └── jwt.ts               # JWT utilities (generate, verify, decode)
├── db/
│   └── connection.ts        # MongoDB connection management
└── models/
    └── User.ts              # Mongoose User schema & model

app/
├── api/auth/
│   ├── login/route.ts       # POST /api/auth/login
│   ├── signup/route.ts      # POST /api/auth/signup
│   ├── logout/route.ts      # POST /api/auth/logout
│   └── me/route.ts          # GET /api/auth/me
└── admin/                    # Protected admin routes

middleware.ts                # Route protection middleware
```

## API Endpoints

### POST /api/auth/signup
Register a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

**Sets:** HttpOnly cookie `authToken` with JWT

### POST /api/auth/login
Authenticate and log in a user.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

**Sets:** HttpOnly cookie `authToken` with JWT

### POST /api/auth/logout
Log out the current user and clear the session.

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

**Clears:** HttpOnly cookie `authToken`

### GET /api/auth/me
Get the current authenticated user's information.

**Response (200):**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

**Response (401):** Not authenticated

## Using the Auth Context

The `AuthContext` provides a React context for managing authentication state on the client side.

### useAuth Hook

```tsx
import { useAuth } from '@/lib/auth/AuthContext';

export function MyComponent() {
  const { user, isLoading, isAuthenticated, login, signup, logout } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user?.name}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <div>Please log in</div>;
}
```

### Available Methods

- `user`: Current user object or null
- `isLoading`: Boolean indicating if auth check is in progress
- `isAuthenticated`: Boolean indicating if user is logged in
- `login(email, password)`: Async function to log in
- `signup(name, email, phone, password, confirmPassword)`: Async function to register

## Protected Routes

The middleware in `middleware.ts` automatically protects routes:

- `/admin/*` - Only accessible to users with `role === 'admin'`

Non-admin users accessing `/admin` are redirected to `/`.
Unauthenticated users are redirected to `/login`.

### Making Routes Admin-Only

Routes are automatically protected by the middleware. No additional code is needed. Just ensure the user's role is set to 'admin' in the database.

## Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs (10 salt rounds)
2. **HttpOnly Cookies**: JWT tokens are stored in HttpOnly cookies (not accessible to JavaScript)
3. **Secure Cookies**: In production, cookies are marked as Secure (HTTPS only)
4. **JWT Expiration**: Tokens expire after 7 days by default
5. **CSRF Protection**: Cookies use SameSite=Lax flag
6. **Input Validation**: Email format, password length, required fields are validated

## Creating an Admin User

To create an admin user, you have two options:

### Option 1: Direct MongoDB Edit
1. Go to MongoDB Atlas
2. Browse Collections → Users
3. Create a new user with `role: "admin"`

### Option 2: Update After Signup
1. User signs up normally (role defaults to 'user')
2. Go to MongoDB Atlas
3. Find the user and update their role to 'admin'

## Testing the Authentication

### Using cURL:

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Current User (with auth token in cookies)
curl -X GET http://localhost:3000/api/auth/me \
  -b "authToken=your_token_here"

# Logout
curl -X POST http://localhost:3000/api/auth/logout
```

## Troubleshooting

### "Cannot find module" errors
Ensure all dependencies are installed:
```bash
npm install mongoose jsonwebtoken bcryptjs
```

### MONGODB_URI is not set
Create `.env.local` file with your MongoDB connection string.

### 401 Unauthorized on protected routes
- Check if the authToken cookie is being set (check browser DevTools)
- Verify JWT_SECRET is the same on client and server
- Check if token has expired (default 7 days)

### Admin routes return 302 redirect
- User is not authenticated: Log in first
- User is not admin: Check role in database is set to 'admin'

## Production Checklist

- [ ] Set strong `JWT_SECRET` (minimum 32 characters)
- [ ] Use environment variables from `.env.local` (never commit)
- [ ] Enable HTTPS (secure cookies require HTTPS in production)
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS if needed
- [ ] Add rate limiting to API endpoints
- [ ] Set up MongoDB backups
- [ ] Monitor authentication logs
- [ ] Implement password reset functionality
- [ ] Add email verification for sign-ups

## Common Issues & Solutions

### "CORS blocked" error
If accessing the API from a different domain, add CORS headers to API routes:

```tsx
export async function POST(request: NextRequest) {
  const response = NextResponse.json({ /* ... */ });
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  return response;
}
```

### Password not being validated on login
Ensure User model is fetching password field:
```tsx
const user = await User.findOne({ email }).select('+password');
```

### Token not persisting across page reloads
- Tokens are stored in HttpOnly cookies (automatic)
- AuthContext checks cookies on mount in `useEffect`
- Ensure cookies are enabled in browser

## Next Steps

1. Update the admin page to show admin-specific content
2. Implement password reset functionality
3. Add email verification for new users
4. Set up refresh token rotation
5. Add multi-factor authentication (MFA)
6. Implement account recovery
