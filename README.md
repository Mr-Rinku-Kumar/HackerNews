markdown
# Hacker News MERN Application

![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)
![GitHub last commit](https://img.shields.io/github/last-commit/Mr-Rinku-Kumar/HackerNews)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Node](https://img.shields.io/badge/Node-18-green)

A full-stack web application that scrapes top stories from Hacker News and allows users to bookmark their favorite stories with JWT authentication. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🌐 Live Demo

- **Frontend (Vercel):** [https://hacker-news-murex.vercel.app/](https://hacker-news-murex.vercel.app/)
- **GitHub Repository:** [https://github.com/Mr-Rinku-Kumar/HackerNews](https://github.com/Mr-Rinku-Kumar/HackerNews)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Challenges & Solutions](#challenges--solutions)
- [Commit History](#commit-history)
- [Author](#author)

## 🎯 Overview

This project was developed as part of a Full Stack Developer (MERN) assignment. It demonstrates proficiency in:

- Web scraping with Cheerio
- REST API development with Express.js
- JWT-based authentication
- React with Context API for state management
- MongoDB database design and operations
- Responsive UI with Tailwind CSS
- Live deployment on Vercel & Render

## ✨ Features

### Core Features (Assignment Requirements)
- ✅ Web scraper that fetches top 10 stories from Hacker News
- ✅ Auto-scraping on server startup
- ✅ Manual scraping via API endpoint `POST /api/scrape`
- ✅ JWT Authentication (Register/Login)
- ✅ Display stories with Title, URL, Points, Author, Posted Time
- ✅ Bookmark toggle functionality
- ✅ Protected bookmarks page
- ✅ React Context API for auth state management
- ✅ Clean folder structure (routes/models/controllers/middleware)
- ✅ Environment variables for all secrets

### Bonus Features Implemented
- 🎁 Pagination (`GET /api/stories?page=1&limit=10`)
- 🎁 Responsive design with Tailwind CSS
- 🎁 Mobile-friendly navigation
- 🎁 Loading states and error handling
- 🎁 Relative time display (e.g., "2 hours ago")
- 🎁 Live deployment on Vercel & Render

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS |
| State Management | React Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Cloud) |
| Authentication | JWT (JSON Web Tokens) |
| Scraping | Axios, Cheerio |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Deployment | Vercel (Frontend), Render (Backend) |

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **MongoDB** (local or MongoDB Atlas account)
- **Git** (for version control)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Mr-Rinku-Kumar/HackerNews.git
cd HackerNews
2. Backend Setup
bash
cd backend
npm install
Create a .env file in the backend directory (see Environment Variables).

3. Frontend Setup
bash
cd ../frontend
npm install
Create a .env file in the frontend directory (see Environment Variables).

🔐 Environment Variables
Backend .env (backend/)
env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hackernews
JWT_SECRET=your_super_secret_key_here
For Production (Render):

Add these variables in Render dashboard → Environment Variables

Use MongoDB Atlas URI (cloud database)

Frontend .env (frontend/)
env
VITE_API_URL=http://localhost:5000/api
For Production (Vercel):

env
VITE_API_URL=https://hackernews-i6c0.onrender.com/api
Note: Variables must start with VITE_ prefix for Vite.

🚀 Running the Application
Development Mode
Start Backend Server
bash
cd backend
npm run dev
# or
node server.js
The server will start on http://localhost:5000

Start Frontend Application
bash
cd frontend
npm run dev
The application will open on http://localhost:5173

Production Build
Build Frontend
bash
cd frontend
npm run build
npm run preview
📚 API Documentation
Authentication Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register a new user	No
POST	/api/auth/login	Login user	No
GET	/api/auth/verify	Verify JWT token	Yes
Register Request Body:

json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
Login Request Body:

json
{
  "email": "john@example.com",
  "password": "123456"
}
Response:

json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
Story Endpoints
Method	Endpoint	Description	Auth Required
GET	/api/stories?page=1&limit=10	Get all stories (paginated)	No
GET	/api/stories/:id	Get single story by ID	No
POST	/api/stories/:id/bookmark	Toggle bookmark	Yes
GET	/api/stories/user/bookmarks	Get user's bookmarks	Yes
Scraper Endpoint
Method	Endpoint	Description	Auth Required
POST	/api/scrape	Manually trigger web scraper	No
📁 Project Structure
text
HackerNews/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── storyController.js     # Story CRUD operations
│   │   └── scrapeController.js    # Scraping logic
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── Story.js               # Story schema
│   ├── routes/
│   │   ├── authRoutes.js          # Auth endpoints
│   │   ├── storyRoutes.js         # Story endpoints
│   │   └── scrapeRoutes.js        # Scrape endpoint
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification
│   ├── utils/
│   │   └── scraper.js             # Web scraping logic
│   ├── .env                       # Environment variables
│   ├── server.js                  # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   └── StoryCard.jsx      # Story card component
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Home page (stories list)
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Register.jsx       # Registration page
│   │   │   └── Bookmarks.jsx      # User bookmarks page
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Authentication context
│   │   ├── utils/
│   │   │   └── api.js             # Axios configuration
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Tailwind CSS imports
│   ├── .env                       # Environment variables
│   ├── tailwind.config.js         # Tailwind configuration
│   ├── vite.config.js             # Vite configuration
│   └── package.json
│
├── .gitignore
└── README.md

🧪 Testing with Postman
Test Backend API with Postman
1. Register User

Method: POST

URL: http://localhost:5000/api/auth/register

Body (raw JSON):

json
{
  "name": "Test",
  "email": "test@test.com",
  "password": "123456"
}
2. Login User

Method: POST

URL: http://localhost:5000/api/auth/login

Body (raw JSON):

json
{
  "email": "test@test.com",
  "password": "123456"
}
3. Get All Stories

Method: GET

URL: http://localhost:5000/api/stories?page=1&limit=10

4. Trigger Scraper

Method: POST

URL: http://localhost:5000/api/scrape

5. Toggle Bookmark (Requires Login Token)

Method: POST

URL: http://localhost:5000/api/stories/:id/bookmark

Headers: Authorization: Bearer YOUR_JWT_TOKEN

🚢 Deployment Guide
Deploy Backend to Render
Push code to GitHub

Sign up at Render

Create Web Service

Connect GitHub repository

Root Directory: backend

Build Command: npm install

Start Command: node server.js

Add Environment Variables

MONGO_URI (MongoDB Atlas URL)

JWT_SECRET (your secret key)

Deploy

Deploy Frontend to Vercel
Go to vercel.com

Import GitHub repository

Root Directory: frontend

Add Environment Variable

VITE_API_URL (your Render backend URL)

Deploy

🐛 Challenges & Solutions
Challenge 1: Date Parsing Issues
Problem: Some Hacker News stories had invalid date formats causing MongoDB cast errors.

Solution: Implemented safe date parsing with fallback to current date.

Challenge 2: JWT Token Persistence on Refresh
Problem: User would be redirected to login page on page refresh despite being logged in.

Solution: Added localStorage persistence and token verification on app initialization.

Challenge 3: React Router Refresh Issue
Problem: Direct URL access or refresh caused 404 on Vercel.

Solution: Added vercel.json with rewrite rules.

📝 Commit History
The project was built with meaningful commits:

initial commit - Project structure setup

backend: add user authentication - JWT register/login

backend: implement web scraper - Cheerio scraping logic

backend: create story models and APIs - CRUD operations

frontend: build React components - Pages and components

frontend: add bookmark functionality - Toggle bookmarks

frontend: implement Context API - Auth state management

frontend: style with Tailwind CSS - Responsive design

Fixed React Router refresh issue - Vercel deployment fix

👨‍💻 Author
RINKU KUMAR

GitHub: @Mr-Rinku-Kumar

Live Project: https://hacker-news-murex.vercel.app/

📄 License
This project is submitted as part of a job assignment and is not for public distribution.

🙏 Acknowledgments
Hacker News for providing the content

MongoDB Atlas for free database hosting

Render for backend deployment

Vercel for frontend deployment

The MERN stack community

🎥 Loom Video Walkthrough
Click here to watch the video walkthrough
https://drive.google.com/file/d/1_auYKnujFphakQvt-7nhOStlex07J3Cr/view?usp=sharing

The video covers:

Project overview

Architecture explanation

Code walkthrough

Feature demonstration

Live deployment demo

Challenges and solutions

✅ Assignment Requirements Checklist
Requirement	Status
Web scraper for top 10 stories	✅
Auto-scrape on server start	✅
Manual scrape via API	✅
JWT Authentication	✅
Story APIs (GET all, GET by ID)	✅
Bookmark toggle API	✅
React frontend with story display	✅
Login & Register pages	✅
Protected bookmarks page	✅
React Context API for auth	✅
.env for all secrets	✅
Clean folder structure	✅
No hardcoded values	✅
Multiple meaningful commits (9 commits)	✅
README with setup instructions	✅
Pagination (bonus)	✅
Responsive design (bonus)	✅
Live deployment (bonus)	✅
Status: ✅ Completed and ready for submission

For any questions or issues, please contact the author via GitHub.
