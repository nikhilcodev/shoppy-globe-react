# 🛒 ShoppyGlobe – React E-Commerce Application

## 📌 Project Overview

**ShoppyGlobe** is a fully functional basic e-commerce web application built using:;

- React
- React Router
- Redux
- TailwindCSS
- Vite

### The application allows users to:

- Browse products
- Search products
- View product details
- Add/remove items from cart
- Modify quantities
- Complete a dummy checkout process

## 🔗 Github Repository Link

You can access the full source code, commit history, and project structure here:

➡️ **https://github.com/nikhilcodev/shoppy-globe-react**

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/nikhilcodev/shoppy-globe-react
```

### 2️⃣ Navigate to Project Folder

```bash
cd shoppy-globe-react
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

## 🎯 Project Objectives

- Build a modular React application
- Implement Redux for state management
- Use React Router (createBrowserRouter)
- Fetch and manage API data
- Apply performance optimization techniques
- Follow clean coding and Git best practices

## 🛠️ Tech Stack

- React (Vite)
- React Router DOM (createBrowserRouter)
- Redux Toolkit
- CSS (Responsive design)
- DummyJSON API  
  https://dummyjson.com/products

## 🧩 Application Features

### 🏠 Home Page

- Displays product list
- Search functionality (Redux-based)
- Lazy-loaded images

### 📦 Product Detail Page

- Dynamic routing using product ID
- Displays detailed information
- Handles invalid product IDs

### 🛒 Cart Page

- Displays added products
- Increase/decrease quantity (minimum 1)
- Remove items
- Shows total price summary

### 💳 Checkout Page

- Dummy user information form
- Order summary
- “Place Order” button:
  - Displays confirmation message
  - Clears cart
  - Automatically redirects to Home page

### ❌ 404 Not Found Page

- Displays meaningful error message
- Handles unknown routes gracefully

## 🔁 Routing Implementation

Routing is implemented using:

```js
createBrowserRouter()
```

### Routes

| Path           | Component          |
| -------------- | ------------------ |
| `/`            | Home (ProductList) |
| `/product/:id` | ProductDetail      |
| `/cart`        | Cart               |
| `/checkout`    | Checkout           |
| `*`            | NotFound           |

- Dynamic routing is implemented for product details.
- Unknown routes display a proper 404 page.

## 🌐 Data Fetching

### Product List

- API Endpoint:  
  https://dummyjson.com/products
- Data fetched using `useEffect`
- Custom hook implemented: `useProducts`
- Data stored in component state
- Error handling included

### Product Detail

- Fetches product based on route parameter
- Uses `useEffect`
- Handles loading and error states

## 🗃️ State Management (Redux)

Redux is used to manage:

- Cart items
- Quantity updates
- Product search query
- Cart totals

### Implementation Includes:

- Redux store configuration
- Cart slice
- Actions
- Reducers
- Selectors

### Cart Functionalities:

- Add to cart
- Remove from cart
- Increase quantity
- Decrease quantity (not below 1)
- Clear cart after order placement

## 🔍 Search Feature

- Search state managed via Redux
- Filters products in ProductList
- Real-time filtering

## ⚡ Performance Optimization

- React.lazy() for component lazy loading
- Suspense for fallback UI
- Code splitting
- Lazy loading images
- Avoid unnecessary re-renders

## 🎨 Styling

- Pure CSS styling
- Responsive layout
- Mobile-friendly design
- Clean and user-friendly interface

## 🧑🏻‍💻 Author

**Nikhil Sharma** <br>
GitHub: https://github.com/nikhilcodev <br>
E-mail: nikhilksharma5@gmail.com

