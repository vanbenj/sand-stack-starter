# SANDstack Starter

This project is a starter for building a SANDstack ([Sveltejs](https://svelte.dev/)/[Sapper](https://sapper.svelte.dev/), [Apollo GraphQL](https://www.apollographql.com/), [Neo4j Database](https://neo4j.com/neo4j-graph-database/)) application. There are two components to the starter, the UI application (a Svelte/Sapper app) and the API app (GraphQL server).

This project used as a starting point the api component from the [GRANDstack](https://grandstack.io) project and the ui component from [rococosans sapper-svelte-apollo-demo](https://github.com/rococosans/sapper-svelte-apollo-demo) project.

>This is my first nodejs project so I expect some clean up is needed in the package.json configurations.
>Any feedback would be appreciated

## Quickstart

You can quickly start via:
```
docker-compose up -d
```

List the running containers:
```
docker ps
```
There should be three containers started:
```
CONTAINER ID        IMAGE                      COMMAND                  CREATED             STATUS              PORTS                                                      NAMES
625acfa444fa        sand-stack-starter_ui      "docker-entrypoint.s…"   3 minutes ago       Up 2 minutes        0.0.0.0:3000->3000/tcp                                     sand-stack-starter_ui_1
843c5ea8d997        sand-stack-starter_api     "docker-entrypoint.s…"   3 minutes ago       Up 2 minutes        0.0.0.0:4001->4001/tcp                                     sand-stack-starter_api_1
8ae79170f66e        sand-stack-starter_neo4j   "/sbin/tini -g -- /d…"   3 minutes ago       Up 3 minutes        0.0.0.0:7474->7474/tcp, 7473/tcp, 0.0.0.0:7687->7687/tcp   sand-stack-starter_neo4j_1
```

Load the example DB after the services have been started:
```
docker-compose run api npm run seedDb
```

You should now be able to access the Neo4j database browser at [localhost:7474](http://localhost:7474) (you can log in using neo4j/letmein)
![](img/neo4j-browser.jpg)


You should also be able to access the Apollo GraphQL browser at [localhost:4001/graphql](http://localhost:4001/graphql)
![](img/graphql-browser.jpg)


The application should be running at [localhost:3000](http://localhost:3000)
![](img/app-browser.jpg)



