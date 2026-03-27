# MERN E-Commerce Platform

A modern, full-stack E-Commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript. 

This project is divided into two parts: a scalable Node.js/Express backend API and a fast, responsive frontend built with React, Vite, and Redux Toolkit.

## 🚀 Features

* **User Authentication:** Secure login and registration (integrated with Firebase on the frontend).
* **Product Management:** Browse, search, and view detailed product information. 
* **Shopping Cart & Checkout:** Add items to cart and seamlessly check out.
* **Payment Integration:** Secure payment processing using Stripe.
* **Admin Dashboard:** Manage users, products, orders, and view performance metrics using Chart.js visualizations.
* **Server-side Caching:** Improved API performance using `node-cache`.
* **Image Uploads:** File handling via Multer.

## 🛠️ Tech Stack

### Frontend (`ecom-frontend`)
* **Framework:** React 19 (built with Vite & SWC)
* **Language:** TypeScript
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`)
* **Routing:** React Router DOM
* **Styling:** SCSS (Sass)
* **Others:** Axios, Firebase, Chart.js, React Hot Toast, TanStack React Table

### Backend (`ecom-backend`)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** MongoDB (via Mongoose)
* **Payment Processing:** Stripe SDK
* **Utilities:** Multer (uploads), NodeCache (caching), Morgan (logging), Validator, UUID

## 💻 Installation & Setup

### Prerequisites
* Node.js installed
* MongoDB connection URI
* Stripe account (for secret keys)
* Firebase project (for frontend config)

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ecom-backend