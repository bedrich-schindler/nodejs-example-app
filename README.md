# Node.js example application

## How to run

There are two possible ways to run the project. First way is to install node, npm and MongoDB
locally and other preferred way is to use Docker. To install docker, check 
[Docker official documentation](https://docs.docker.com/install/). This readme covers only the case
when Docker is installed.

If Docker is started, execute `docker-compose up` command to run the project. Docker automatically 
starts MongoDB and node environments with the project. Project should be started 
available `http://localhost:3000`. On first start, execute 
`docker exec nodejs-example-app_node_1 npm run database-initialization` to init database.
Hot reloading is configured, so the project automatically restarts if you make change in code.

If Docker and project is started and you need to run any command in started container, use
`docker exec nodejs-example-app_node_1 <command>` to execute command:

* `docker exec nodejs-example-app_node_1 npm install --save <library>` - installs new dependency
* `docker exec nodejs-example-app_node_1 npm install --save-dev <library>` - installs new dev dependency
* `docker exec nodejs-example-app_node_1 npm install` - installs dependencies from `package-lock.json`
* `docker exec nodejs-example-app_node_1 npm update` - updates dependencies and `package-lock.json`
* `docker exec nodejs-example-app_node_1 npm test` - runs tests

Or you can enter interactive mode if you execute `docker exec -it nodejs-example-app_node_1 bash`.

## How to use

1. Make POST request on `http://localhost:3000/auth/login` with `{"email": "...", "password": "..."}`
to receive  `token`.
2. Make any request with header `Authorization: Bearer <token>`.
