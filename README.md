# chunk

## Getting started

```sh
# clone project
git clone git@github.com:ptessier/chunk.git
```

```sh
# install the dependencies
yarn install
```

```sh
# deploy the containers
docker-compose up -d
```

```sh
# start the server
yarn start
```

## Prisma

### Introspection

Update the database and the related files in `database/init` folder,

```sh
# update schema.prisma from the database
yarn prisma introspect
```

```sh
# update the prisma client
yarn prisma generate
```

[source](https://www.prisma.io/docs/reference/tools-and-interfaces/introspection)

### Migration

Update `schema.prisma` file,

```sh
# create a migration
prisma migrate save --experimental
```

```sh
# update the database with the migration
prisma migrate up --experimental
```

Finally, update the schema in `database/init`.

[source](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate)

## Docker

```sh
# dump a postgres docker container
docker exec [container-name] pg_dump -U postgres --schema-only --no-owner [db-name] > database/init/schema.sql
```
