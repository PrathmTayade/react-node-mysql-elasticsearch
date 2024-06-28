## Backend

env file is included for devlopment puropses

```bash
cd backend

# for mysql and elasticsearch

docker compose up -d

# Dependencies
pnpm install

# Run the scraper
node scraper/scraper.js

# Run backend
pnpm dev # http://localhost:9200



```

## Frontend

```bash
cd frontend

# Dependencies
pnpm install

# Run frontend
pnpm dev

```
