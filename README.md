# Admin Dish Dashboard

A full-stack web application built to manage and display restaurant dish information. This project features a responsive React frontend dashboard and a secure Node.js/Express REST API connected to a MongoDB Atlas database.

## 🚀 Features
* **View Dishes:** Fetches and displays a grid of dishes from the database.
* **Status Management:** Toggle the published/unpublished status of any dish with immediate UI updates.
* **Responsive UI:** Built with Tailwind CSS v4 to ensure seamless scaling across desktop and mobile screens.
* **Modern Architecture:** Strict separation of concerns between the client (Vite/React) and server (Node/Express).

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS v4, Axios
* **Backend:** Node.js, Express.js, Mongoose
* **Database:** MongoDB Atlas

## 📂 Project Structure
```text
dish_dashboard/
├── backend/                  # Node.js Express server
│   ├── models/               # Mongoose schemas (Dish.js)
│   ├── dishRoutes.js         # API endpoints
│   ├── server.js             # Server entry point
│   └── seed.js               # Database initialization script
├── src/                      # Vite React frontend
│   ├── components/           # Reusable UI components (DishCard.jsx)
│   ├── App.jsx               # Main dashboard component
│   └── index.css             # Tailwind imports
├── sampleDB.json             # Raw data for seeding
└── package.json              # Project dependencies
```






# ⚙️ Local Setup & Installation

## 1. Clone the Repository

Clone the repository and navigate to the project directory.

```bash
git clone <your-repository-url>
cd dish_dashboard


---

## 2. Backend Configuration

Navigate to the backend directory and install the required dependencies.

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file inside the `backend` directory and add the following environment variables:

```env
PORT=5000
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/dish_database?retryWrites=true&w=majority"
```

### Seed the Database (Optional)

Run the following command to populate the database with sample data:

```bash
node seed.js
```

### Start the Backend Server

```bash
node server.js
```

The backend server will run on:

```text
http://localhost:5000
```

---

## 3. Frontend Configuration

Open a new terminal, navigate to the project root directory, and install the frontend dependencies.

```bash
npm install
```

Start the Vite development server.

```bash
npm run dev
```

The frontend application will be available at:

```text
http://localhost:5173
```

---

# 📡 API Reference

## Get All Dishes

**Endpoint**

```http
GET /api/dishes
```

**Description**

Returns a JSON array containing all available dish objects.

---

## Toggle Dish Publish Status

**Endpoint**

```http
PATCH /api/dishes/:id/toggle
```

### Path Parameter

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `id`      | Number | The unique `dishId` of the dish. |

### Description

Finds the dish using its custom `dishId`, toggles the `isPublished` status, and returns the updated document.

---

## 👨‍💻 Author

**Mayank Rohilla**

