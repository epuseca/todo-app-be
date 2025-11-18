# Todo App - Backend

Simple Express.js backend for a Todo application. Provides API routes under `/api`, connects to a database, and uses environment variables for configuration.

## Features
- Express server with JSON body parsing and cookie support
- CORS enabled for a separate frontend
- MongoDB connection (example) via `src/config/database`
- Authentication-ready (JWT / sessions placeholders)

## Prerequisites
- Node.js (v14+ recommended)
- npm (or yarn)
- A MongoDB instance (local or hosted)

## Quick Start

1. Install dependencies

```powershell
npm install
```

2. Copy environment example and fill values

```powershell
copy .env.example .env
# then edit .env with your values
```

Keys used in `.env.example`:

- `PORT` - server port (default `3000` in example; `server.js` falls back to `8080` if unset)
- `NODE_ENV` - `development` / `production`
- `MONGO_URI` - MongoDB connection string (e.g. `mongodb://localhost:27017/todoapp`)
- `JWT_SECRET` / `SESSION_SECRET` - secrets for auth/session signing
- `CLIENT_URL` - frontend origin for CORS
- `LOG_LEVEL` - logging verbosity (e.g. `info`)

3. Start the server

```powershell
npm start
# or to run directly
node server.js
```

The app will log the listening port. By default `server.js` uses `process.env.PORT || 8080`.

## Project Structure

```
.
├─ server.js
├─ package.json
├─ .env.example
└─ src/
   ├─ config/
   │  └─ database.js
   ├─ controllers/
   ├─ middleware/
   ├─ models/
   ├─ routes/
   └─ services/
```

## Notes
- `dotenv` is already used in `server.js` (`require('dotenv').config()`), so environment variables in `.env` will be loaded automatically.
- Make sure to add `.env` to `.gitignore` so secrets are not committed.

## Contributing
- Fork the repo, create a branch, make changes, and open a pull request.

## Troubleshooting
- If the server fails to connect to the DB, check `MONGO_URI` and that MongoDB is reachable.
- For CORS issues, ensure `CLIENT_URL` matches your frontend origin.

## License
This project does not include a license file. Add one if you plan to open-source this repository.

### Link project

https://roadmap.sh/projects/todo-list-api