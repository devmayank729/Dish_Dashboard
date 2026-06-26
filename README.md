# Admin Dish Dashboard

A full-stack web application built to manage and display restaurant dish information. This project features a responsive React frontend dashboard and a secure Node.js/Express REST API connected to a MongoDB Atlas database. 

**Update:** The application has been upgraded with WebSocket integration to support real-time data synchronization.

## 🚀 Features
* **Real-Time Synchronization:** Powered by Socket.io, any changes made to a dish's status on the backend are instantly broadcasted to the frontend without requiring a page refresh.
* **View Dishes:** Fetches and displays a grid of dishes from the database.
* **Status Management:** Toggle the published/unpublished status of any dish with immediate UI and database updates.
* **Responsive UI:** Built with Tailwind CSS v4 to ensure seamless scaling across desktop and mobile screens.
* **Modern Architecture:** Strict separation of concerns between the client (Vite/React) and server (Node/Express).

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS v4, Axios, Socket.io-client
* **Backend:** Node.js, Express.js, Mongoose, Socket.io
* **Database:** MongoDB Atlas

## 📂 Project Structure
```text
dish_dashboard/
├── backend/                  # Node.js Express server
│   ├── models/               # Mongoose schemas (Dish.js)
│   ├── dishRoutes.js         # API endpoints & WebSocket emitters
│   ├── server.js             # Server entry point & Socket initialization
│   └── seed.js               # Database initialization script
├── src/                      # Vite React frontend
│   ├── components/           # Reusable UI components (DishCard.jsx)
│   ├── App.jsx               # Main dashboard component & Socket listener
│   └── index.css             # Tailwind imports
├── sampleDB.json             # Raw data for seeding
└── package.json              # Project dependencies
```

# ⚙️ Local Setup & Installation

Follow the steps below to run the project locally.

## 1. Clone the Repository

Clone the repository and navigate to the project directory.

```bash
git clone <your-repository-url>
cd dish_dashboard
```

---

## 2. Backend Setup

Navigate to the backend folder and install the required dependencies.

```bash
cd backend
npm install
```

### Create Environment Variables

Create a `.env` file inside the `backend` directory and add the following:

```env
PORT=5000
MONGOD_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/dish_database?retryWrites=true&w=majority"
```

### (Optional) Seed the Database

Populate MongoDB with sample dishes.

```bash
node seed.js
```

### Start the Backend Server

```bash
node server.js
```

The backend server will start at:

```
http://localhost:5000
```

---

## 3. Frontend Setup

Open a **new terminal**, navigate to the project root, and install the frontend dependencies.

```bash
npm install
```

Start the Vite development server.

```bash
npm run dev
```

The frontend application will be available at:

```
http://localhost:5173
```

---

# 📡 API Reference

## Get All Dishes

| Method | Endpoint      |
| ------ | ------------- |
| `GET`  | `/api/dishes` |

### Description

Returns a JSON array containing all available dishes.

---

## Toggle Dish Publish Status

| Method  | Endpoint                 |
| ------- | ------------------------ |
| `PATCH` | `/api/dishes/:id/toggle` |

### Path Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `id`      | `Number` | The custom `dishId` of the dish. |

### Description

* Finds the dish using its custom `dishId`.
* Toggles the `isPublished` status.
* Saves the updated document to MongoDB.
* Returns the updated dish.

### Real-Time Updates

Every successful toggle broadcasts a WebSocket event:

```text
dishUpdated
```

All connected clients receive the update instantly without refreshing the page.

---

# 👨‍💻 Author

**Mayank Rohilla**
