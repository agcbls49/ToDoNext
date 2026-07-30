# Setup for Recreation or Cloning

## Run Using Docker

Make sure Docker Desktop is installed and running.

Clone the repository:

```bash
git clone https://github.com/agcbls49/ToDoNext.git
cd ToDoNext
```

Start the application:

```bash
docker compose up --build
```

The application will be available at:

**Frontend:**  
http://localhost:3000

**Backend:**  
http://localhost:4000/tasks


## Environment Variables

### Local Development (Without Docker)

If running the project locally without Docker, create the following environment files.

**Backend:**

Create:

```text
backend/.env
```

Add your local MySQL database connection values.

**Frontend:**

Create:

```text
frontend/.env.local
```

Use the values from:

```text
frontend/.env.example
```


### Docker Setup

When running with Docker Compose, the backend database configuration is provided automatically through `compose.yml`.

No additional backend `.env` setup is required for Docker.


## Stop the Containers

```bash
docker compose down
```


## Rebuild After Changes

```bash
docker compose up --build
```