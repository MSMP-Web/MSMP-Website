MSMP Backend
=================

Quick Express + MongoDB backend for the MSMP website. This server provides CRUD endpoints for the same datasets that are present in `src/data/alldata.js`.

Setup
------

1. Copy `.env.example` to `.env` in the `server` folder and fill `MONGO_URI` with your MongoDB Atlas connection string.

2. Install dependencies and run:

```powershell
cd server
npm install
# development with automatic reload
npm run dev
# or production
npm start
```

Seeding the database (development)
---------------------------------
The server includes a convenience endpoint to seed the MongoDB collections with the data found in `src/data/alldata.js` (useful during development).

- Start the server (see above).
- Make a POST request to `http://localhost:5000/api/seed` (e.g. using curl, Postman, or the browser extension).

Example:

```powershell
curl -X POST http://localhost:5000/api/seed
```

Endpoints
---------

- `GET /api/alldata` - list all items
- `GET /api/alldata/:id` - get by numeric id
- `POST /api/alldata` - create
- `PUT /api/alldata/:id` - update by numeric id
- `DELETE /api/alldata/:id` - delete by numeric id

- `GET /api/voices` - voices in action (supports standard CRUD operations similar to alldata)
- `GET /api/calendar` - calendar events
- `GET /api/notices` - notices

Notes
-----
- The seed endpoint imports `src/data/alldata.js` from the frontend source; make sure the path remains valid.
- This server is intended as a starting point. You should add authentication (e.g., JWT) and validation before using it in production.
