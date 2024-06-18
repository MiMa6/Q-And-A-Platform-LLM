TODO: The RUNNING.md outlines steps needed to run the application separately for the development mode and the production mode.

TODO: For merits, the RUNNING.md also outlines the steps needed to use Kubernetes to run the application with Minikube (or somilar), using kubernetes configuration files created as parts of the passing with merits requirements

## Testing - Playwright

### Runnin app with development configurations

```bash
docker compose up
```

### Running app with production configurations

#### Pre steps
1. Create copy of project.env and rename it pr
2. Change FLYWAY_URL and PGHOST to following:
 * FLYWAY_URL=jdbc:postgresql://database-server-edulearn-prod/database 
* PGHOST=database-server-edulearn-prod

```bash
docker compose -f docker-compose.prod.yml up -d
```

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
