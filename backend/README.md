
# 🚀 Elite Expense Management Backend

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (Access + Refresh Tokens)
- Zod Validation

---

## 🔐 Authentication Features
- User Register
- User Login
- Access Token (15 min)
- Refresh Token (7 days)
- Refresh endpoint
- Logout (client-side token clear)
- Role-Based Access (admin / user)
- Protected Routes Middleware

---

## 💰 Expense Features
- Create Expense (Idempotency Safe)
- Edit Expense
- Delete Expense
- Pagination
- Category Filter
- Sort (date_asc / date_desc)
- Total Count
- Total Spending Aggregation
- Category Summary (Pie Chart Ready)
- Monthly Analytics
- Budget Limit Support
- Income Tracking Support

---

## 🛡 Security
- Password hashing (bcrypt)
- JWT verification middleware
- Role-based authorization middleware
- Input validation using Zod
- MongoDB indexes for performance

---

## ⚙️ Environment Variables (.env)

PORT=5000  
MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret  
JWT_REFRESH_SECRET=your_refresh_secret  

---

## ▶️ Run Locally

npm install  
npm run dev  

---

## 🌍 Deployment
Recommended:
- MongoDB Atlas
- Render (Backend Hosting)

---

Clean, scalable, production-ready backend.
