TODO: The RUNNING.md outlines steps needed to run the application separately for the development mode and the production mode.

TODO: For merits, the RUNNING.md also outlines the steps needed to use Kubernetes to run the application with Minikube (or somilar), using kubernetes configuration files created as parts of the passing with merits requirements

## Testing - Playwright

Running all tests

```bash
docker compose run --rm --entrypoint=npx playwright playwright test
```

Running test file

```bash
 docker-compose run --rm --entrypoint=npx playwright playwright test coursepage.spec.js
```
