# FitZone Gym & Class Booking System

A beginner-friendly full-stack gym class booking system for the ITUE301 practical examination.

## Technologies

React, Vite, React Router DOM, Node.js, Express, MongoDB, Mongoose, JWT, and Fetch API.

## Setup

1. Install MongoDB locally or create a MongoDB Atlas database.
2. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI`, `PORT`, and `JWT_SECRET`.
3. Copy `frontend/.env.example` to `frontend/.env`.
4. Seed sample data:

```text
cd backend
npm install
npm run seed
```

Run the backend in one terminal:

```text
cd backend
npm start
```

Run the frontend in another terminal:

```text
cd frontend
npm install
npm run dev
```

The demo login email is `member@example.com`.

## API Endpoints

| Method | Endpoint | Auth |
| --- | --- | --- |
| POST | `/api/v1/auth/register` | Public |
| POST | `/api/v1/auth/login` | Public |
| GET | `/api/v1/trainers` | Public |
| POST | `/api/v1/bookings` | Bearer token |
| GET | `/api/v1/bookings/my` | Bearer token |
| PATCH | `/api/v1/bookings/:id/status` | Bearer token |

Use Postman or Thunder Client to log in first, copy the returned JWT, and send it as `Authorization: Bearer TOKEN` for booking requests. Invalid or incomplete booking data returns `400`, missing tokens return `401`, and successful booking creation returns `201`.

## Structure

`frontend/src` contains the React pages, components, context, routing, and styles. `backend` contains Mongoose models, Express routes, middleware, the server, and seed script.
