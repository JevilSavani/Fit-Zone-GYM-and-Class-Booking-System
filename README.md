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

Test login emails are `member@fitzone.com`, `trainer@fitzone.com`, and `admin@fitzone.com`.

## API Endpoints

| Method | Endpoint | Auth |
| --- | --- | --- |
| POST | `/api/v1/auth/register` | Public |
| POST | `/api/v1/auth/login` | Public |
| GET | `/api/v1/trainers` | Public |
| POST | `/api/v1/bookings` | Bearer token |
| GET | `/api/v1/bookings/my` | Bearer token |
| PATCH | `/api/v1/bookings/:id/status` | Bearer token |
| GET | `/api/v1/trainers/my-schedule` | Trainer token |
| GET | `/api/v1/admin/stats` | Admin token |

## Role Testing

1. Run `npm run seed` in `backend`.
2. Log in as `member@fitzone.com` to open Classes and My Bookings. Members can create bookings.
3. Log out, then log in as `trainer@fitzone.com` to open My Schedule.
4. Log out, then log in as `admin@fitzone.com` to open Admin Panel and view live counts.
5. A user with the wrong role receives `403 Access denied` from protected API endpoints and sees Access Denied in the frontend.

Use Postman or Thunder Client to log in first, copy the returned JWT, and send it as `Authorization: Bearer TOKEN` for booking requests. Invalid or incomplete booking data returns `400`, missing tokens return `401`, and successful booking creation returns `201`.

## Structure

`frontend/src` contains the React pages, components, context, routing, and styles. `backend` contains Mongoose models, Express routes, middleware, the server, and seed script.
