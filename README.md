# Task Manager

Web Engineering end semester project — a full-stack Task Manager built with **AngularJS**, **Node.js + Express.js**, and **MongoDB**.

---

## Folder Structure

```
Task-Manager/
├── backend/
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── styles.css
└── README.md
```

---

## System Architecture

```
AngularJS (Browser)  ←→  Express.js API (Node.js)  ←→  MongoDB
```

- **Frontend**: AngularJS single-page app served as static files  
- **Backend**: RESTful API built with Express.js  
- **Database**: MongoDB via Mongoose ODM  

---

## REST API Endpoints

| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| GET    | /api/tasks         | Fetch all tasks    |
| GET    | /api/tasks/:id     | Fetch single task  |
| POST   | /api/tasks         | Create a task      |
| PUT    | /api/tasks/:id     | Update a task      |
| DELETE | /api/tasks/:id     | Delete a task      |

---

## Database Schema (MongoDB)

Collection: `tasks`

| Field       | Type    | Default |
|-------------|---------|---------|
| title       | String  | —       |
| description | String  | `""`    |
| status      | Boolean | `false` |

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`

### 1 — Install backend dependencies

```bash
cd backend
npm install
```

### 2 — Start the backend server

```bash
npm start
```

The API will be available at `http://localhost:3000`.

### 3 — Open the frontend

Open `frontend/index.html` directly in a browser, **or** serve it with any static server:

```bash
# example using npx
npx serve frontend
```

---

## Sample Test Data

```json
[
  { "title": "Buy groceries", "description": "Milk, eggs, bread", "status": false },
  { "title": "Read a book", "description": "Finish Clean Code", "status": true },
  { "title": "Exercise", "description": "30-minute run", "status": false }
]
```

---

## Technologies Used

- AngularJS 1.8 (frontend MVC framework)
- Node.js + Express.js (REST API backend)
- Mongoose (MongoDB ODM)
- CORS (cross-origin requests)

