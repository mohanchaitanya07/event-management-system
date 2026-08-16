# Event Management System

A MERN application for creating and managing events across multiple users and timezones. An admin can create profiles, assign events to one or more of them, and each profile views every event in a timezone of their own choosing.

**Live app:** https://event-management-system-green-nu.vercel.app

**API:** https://event-management-api-amzq.onrender.com


## Tech stack

- **Frontend:** React (Vite), Zustand, vanilla CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Timezones:** dayjs

## Running locally

Requires Node 18+ and a MongoDB connection string.

### Backend

```bash
cd server
npm install
```

Create `server/.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/eventmanager?retryWrites=true&w=majority
```

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

Open http://localhost:5173.
