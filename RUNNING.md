## Run - Q&A Platform 
### Pre configurations for MacBook M1 users

Change the first line of **qa-api/Dockerfile** & **qa-api/Dockerfile.prod** like below

```js
FROM denoland/deno:alpine-1.31.0
```
to
```js
FROM lukechannings/deno:v1.37.0
```

### Running app with development configurations

```bash
docker compose up
```

### Running app with production configurations

#### Pre steps
1. Create copy of project.env and rename it projectprod.env
2. Change FLYWAY_URL and PGHOST to following:
 
 ```env
 FLYWAY_URL=jdbc:postgresql://database-server-edulearn-prod/database
 PGHOST=database-server-edulearn-prod
 ```

then...

```bash
docker compose -f docker-compose.prod.yml up -d
```

## Testing - Playwright
### Running all tests

```bash
docker compose run --rm --entrypoint=npx playwright playwright test
```

### Running test files one by one

```bash
docker-compose run --rm --entrypoint=npx playwright playwright test mainpage.spec.js
docker-compose run --rm --entrypoint=npx playwright playwright test coursepage.spec.js
docker-compose run --rm --entrypoint=npx playwright playwright test questionpage.spec.js
```
