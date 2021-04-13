# Products api
### Installation

- [Docker](https://docs.docker.com/engine/install/ubuntu/) installation needed for mongodb_v4 + Node_v14 
- Install dependencies: `npm i `

### Configuration:
- **/config**: remove "_example" from  **.env** and **secrets** file names in `mongoDB` and `Node` folders

### Usage:
Use command `docker-compose up` in project's parent dir cli. To test the project, comment out 
**#command: sh -c "npm run start_dev"** and enable
**command: "npm run test"** in docker-compose.yml file (line 24)