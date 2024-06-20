FROM flyway/flyway:latest

# Assuming we're building the image inside the `flyway` -folder
COPY sql/ /flyway/sql/

# Use shell form for entrypoint to get access to env variables
# Add your "qa-api-database-cluster-rw" service host manually like -> -url="jdbc:postgresql://<YOUR HOST HERE>:5432/${FLYWAY_USER_DB_CLUSTER}"
ENTRYPOINT ./flyway migrate -user=$FLYWAY_USER_DB_CLUSTER -password=$FLYWAY_PASSWORD_DB_CLUSTER -url="jdbc:postgresql://10.111.8.169:5432/${FLYWAY_USER_DB_CLUSTER}"

