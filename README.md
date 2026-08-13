# SurveyJS + NodeJS + MongoDB Demo Example

This demo shows how to integrate [SurveyJS](https://surveyjs.io/) components with a NodeJS backend using a MongoDB database as a storage.

[View Demo Online](https://surveyjs-nodejs-mongodb.demos.surveyjs.io/)

## Disclaimer

This demo must not be used as a real service as it doesn't cover such real-world survey service aspects as authentication, authorization, user management, access levels, and different security issues. These aspects are covered by backend-specific articles, forums, and documentation.

## Run the Application

1. Install [NodeJS](https://nodejs.org/) and [Docker Desktop](https://docs.docker.com/desktop/) on your machine.

2. Run the following commands:

    ```bash
    git clone https://github.com/surveyjs/surveyjs-nodejs-mongodb.git
    cd surveyjs-nodejs-mongodb
    docker compose up -d
    ```

3. Open http://localhost:9080 in your web browser.

## Client-Side App

The client-side part is the `surveyjs-react-client` React application. The current project includes only the application's build artifacts in the [public](./public/) directory. Refer to the [`surveyjs-react-client`](https://github.com/surveyjs/surveyjs-react-client) repo for full code and information about the application.

## Integrate SurveyJS with MongoDB

SurveyJS communicates with any database using JSON objects that contain either survey schemas or user responses. A MongoDB database should have two collections to store these objects: `surveys` and `results`. You can refer to the following file to view a code example of how to create them: [`surveyjs-init.js`](mongo/entrypoint/surveyjs-init.js). The diagram below shows the structure of these collections:

![SurveyJS: The structure of database collections](https://github.com/surveyjs/surveyjs-nodejs-postgresql/assets/18551316/176a0e1d-963c-4ec0-a11d-33631aa05770)

To modify data in the `surveys` and `results` collections, you need to implement several JavaScript functions. According to the tasks they perform, these functions can be split into three modules:

- **Query builder**        
JS functions that construct CRUD queries (see the [`nosql-crud-adapter.js`](express-app/db-adapters/nosql-crud-adapter.js) file).

- **Query runner**         
JS functions that establish connection with a database to run the queries (see the [`mongo.js`](express-app/db-adapters/mongo.js) file).

- **Survey storage**        
JS functions that provide an API for working with survey schemas and user responses (see the [`survey-storage.js`](express-app/db-adapters/survey-storage.js) file). This API is used by the NodeJS application router (see the [`index.js`](express-app/index.js) file).

These modules interact with each other as shown on the following diagram:

![SurveyJS MongoDB Integration](https://github.com/surveyjs/surveyjs-nodejs-postgresql/assets/18551316/b0b13d77-f0a4-44a4-a34d-6c318d1f559b)

If you want to integrate SurveyJS with other databases, you can modify or replace the query builder and query runner without changing the survey storage module. This approach is applied to PostgreSQL integration in the following repository: [`surveyjs-nodejs-postgresql`](https://github.com/surveyjs/surveyjs-nodejs-postgresql).