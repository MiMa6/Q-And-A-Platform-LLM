FROM flyway/flyway:latest

# Assuming we're building the image inside the `flyway` -folder
COPY sql/ /flyway/sql/

# Use shell form for entrypoint to get access to env variables
# ENTRYPOINT ./flyway migrate -user=$FLYWAY_USER_DB_CLUSTER -password=$FLYWAY_PASSWORD_DB_CLUSTER -url="jdbc:postgresql://${QA_API_DATABASE_CLUSTER_RW_SERVICE_HOST}:${QA_API_DATABASE_CLUSTER_RW_SERVICE_PORT}/${FLYWAY_USER_DB_CLUSTER}"
# ENTRYPOINT ./flyway migrate -user=$FLYWAY_USER_DB_CLUSTER -password=$FLYWAY_PASSWORD_DB_CLUSTER -url="jdbc:postgresql://qa-api-database-cluster-rw-service:5432/${FLYWAY_USER_DB_CLUSTER}"
ENTRYPOINT ./flyway migrate -user=$FLYWAY_USER_DB_CLUSTER -password=$FLYWAY_PASSWORD_DB_CLUSTER -url="jdbc:postgresql://10.111.85.240:5432/${FLYWAY_USER_DB_CLUSTER}"

