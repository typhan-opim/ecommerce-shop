
# ecommerce-shop-ty

## Overview

This project is a full-stack e-commerce system including:
- **Backend:** Node.js, Express, MongoDB, JWT authentication, Stripe payment, RESTful API.
- **Frontend:** React, TypeScript, Redux Toolkit, React Query, TailwindCSS, Vite.

## Backend

- Folder: `backend/`
- Built with ExpressJS, MongoDB (Mongoose), JWT for authentication, Stripe for payment.
- Main APIs:
	- User registration/login/logout
	- Get/update user info, user roles
	- Product CRUD, category, search/filter
	- Cart management (add, update, delete, count)
	- Order, payment, Stripe webhook
	- Order management (admin, user)
- Start server:
	```bash
	cd backend
	yarn install
	yarn dev
	```
- Configure environment variables in `.env` (see `env.sample`).

## Frontend

- Folder: `frontend/`
- Built with React + TypeScript, Redux Toolkit, React Query, React Router, TailwindCSS, Stripe.js.
- Features:
	- User registration/login/logout, authentication
	- Product display, search, filter, category
	- Product management (admin)
	- Cart management, order, Stripe payment
	- Order and user management (admin)
- Start frontend:
	```bash
	cd frontend
	yarn install
	yarn dev
	```
- Configure environment variables in `.env` (see `.env.example`).

## Folder Structure

```
ecommerce-shop-ty/
	backend/
		controller/
		models/
		routes/
		...
	frontend/
		src/
			components/
			pages/
			store/
			context/
			...
```

## Development Guide

- Run backend and frontend concurrently.
- Make sure to set up environment variables for API and Stripe integration.
- See backend `controller` and `routes` for API details.

---
