# FinTrack (Express server)

This project now has Express installed and a minimal `server.js` that serves `index.html` and exposes a `/health` endpoint.

To run:

```powershell
npm start
```

Docker
------

Build the image:

```powershell
docker build -t fintrack:latest .
```

Run with Docker:

```powershell
docker run -p 3000:3000 --name fintrack -d fintrack:latest
```

Or with docker-compose:

```powershell
docker-compose up --build
```

Then open `http://localhost:3000`.

Database
--------

The included `docker-compose.yml` starts a MySQL 8.0 container with the following credentials:

- host: `mysql` (hostname inside the docker network)
- port: `3306`
- database: `findb`
- user: `finuser`
- password: `finpass`

Endpoints added:

- `/health` — app health
- `/db-health` — attempts a simple query to MySQL and returns status

To bring up both services:

```powershell
docker-compose up --build
```

To stop and remove containers:

```powershell
docker-compose down
```
