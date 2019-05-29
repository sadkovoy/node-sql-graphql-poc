## Node.js + MySQL + GraphQL POC


### Requirements
- docker
- docker-compose

### Quickstart

`docker-compose up server`

then

`http://localhost:8000/graphql`

### Used libraries
- express (web-framework)
- apollo-server (graphql server + graphiql)
- graphql
  - graphql-import (import and concatenate .graphql files)
  - graphql-fields (parse resolve info to get the list of requested attributes)
  - sequelize (ORM)
  - dataloader-sequelize (needed to avoid N+1 queries problem)
  - sequelize-paginate (tiny plugin for sequelize models pagination)

### Storage
MySQL version 5.7

### Troubleshooting
- `Unhandled rejection SequelizeConnectionRefusedError: connect ECONNREFUSED` - try to restart server. The reason is pretty simple - web-app started quicker than MySQL :)
