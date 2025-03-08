# Role-Based Ticketing System

## Overview

This is a basic role-based ticketing system where users can create support tickets, and admins can manage those tickets. The system implements user authentication using JWT (JSON Web Tokens) and includes role-based access control to restrict ticket management to admins.

## Technologies Used

- **Frontend**: React.js, Next.js
- **Backend**: Node.js, Express.js, MongoDB, JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **State Management**: Context API

## Features

### User Features

- **Signup**: Register users with email, password, and role selection (User or Admin).
- **Login**: Authenticate users and get a JWT token.
- **Create Tickets**: Users can create support tickets with a title, description, and status.
- **View Tickets**: Users can view only their own tickets.

### Admin Features

- **View All Tickets**: Admin can see all tickets created by users.
- **Update Ticket Status**: Admin can change the status of any ticket (Open, In Progress, Closed).

### Authentication

- **JWT Authentication**: Users must be authenticated to access protected routes.
- **Role-Based Access**: Only admins can manage all tickets, while regular users can only view their own tickets.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Hunde-D/support-ticketing-system.git
   cd support-ticketing-system
   ```

### Backend Setup (Node.js, MongoDB)

2. Install dependencies:

   ```bash
   cd backend
   ```

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the /backend of the project.
   - Add the following environment variables:
     ```
     JWT_SECRET=your_jwt_secret_key
     MONGO_URI=your_mongodb_connection_string
     ```

4. Run the backend server:
   ```bash
   pnpm start or pnpm dev
   ```

### Frontend Setup (React.js with Next.js)

5. Install dependencies:

   ```bash
   cd frontend
   ```

   ```bash
   pnpm install
   ```

6. Run the frontend development server:
   ```bash
   pnpm run dev
   ```

---

## API Endpoints

### Authentication

- **POST `/api/auth/signup`**

  - Description: Register a new user.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "role": "user" // or "admin"
    }
    ```
  - Response: `201 Created` on success, `400` on validation failure.

- **POST `/api/auth/login`**

  - Description: Login with email and password and get a JWT token.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - Response: `{ "token": "JWT_TOKEN" }` on success.

- **GET `/api/auth/me`**
  - Description: Get current logged-in user details.
  - Headers: `Authorization: Bearer JWT_TOKEN`
  - Response: `200 OK` with user details.

### Tickets

- **POST `/api/tickets`**

  - Description: Create a new support ticket (Users only).
  - Request Body:
    ```json
    {
      "title": "Ticket Title",
      "description": "Ticket Description"
    }
    ```
  - Response: `201 Created` on success.

- **GET `/api/tickets`**

  - Description: Get tickets.
  - Response:
    - Users will only get their own tickets.
    - Admins will see all tickets.

- **PUT `/api/tickets/:id`**
  - Description: Update the status of a ticket (Admins only).
  - Request Body:
    ```json
    {
      "status": "open" // or "in-progress", "closed"
    }
    ```
  - Response: `200 OK` on success.

---

## Folder Structure

```
/backend
  ├── api
  │   ├── controllers        # Route handlers for authentication and ticket operations
  │   ├── lib                # Utility functions
  │   ├── middleware         # Auth and role-based access middleware
  │   ├── model              # Mongoose models (User, Ticket)
  │   ├── routes             # API routes
  │   ├── types              # TypeScript type definitions
  │   ├── index.ts           # Main backend entry point
  │   ├── server.ts          # Express server setup

/frontend
  ├── .next                  # Next.js build files
  ├── actions                # API actions
  ├── app                    # Next.js app directory
  ├── components             # Reusable UI components
  ├── context                # Context for managing authentication state
  ├── hooks                  # Custom React hooks
  ├── lib                    # Utility functions
  ├── middleware.ts          # Middleware functions
```

---

## Contact

For any questions or support, please reach out to me at [hunde.ddh@gmail.com](hunde.ddh@gamil.com) or via Telegram at [@Hunde_D](https://t.me/Hunde_D).
