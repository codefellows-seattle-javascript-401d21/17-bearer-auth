## Lab 16 - Basic Authentication

This project will create basic authorization middleware and test for signup/signin routes.

**Installation**
Fork this repository and install on your machine using git clone. Switch to the lab-karen folder.

This project requires Node JS and npm( Node package manager). You will also need a method to create RESTFUL operation statement; a utility like HTTPie or Postman will do this.

Run *npm init* to set up program dependancies. Use *npm i express mongoose body-parser cors bcrypt jsonwebtoken* to install dependancies for (in order)
- express which provides a thin layer of fundamental web application features to create an API
- mongoose which acts as an interface between javascript and Mongo DB
- body-parser which parses incoming request bodies in middleware before your handlers, in the req.body property
- cors for handling cross origin resource sharing
- bcrypt which is a password hashing function
- jsonwebtoken to encode and decode JWT with header and payload and signature.


Use *npm i -D jest eslist superagent dotenv debug faker* to install developer dependancies for (in order)
- testing
- linting
- for making CRUD requests
- setting up the environment variables
- for debugging the development process
- creating "fake" data for testing.

Additionally, add the following scripts to your package.json file
```
"scripts": {
  "start": "node index.js",
  "start:watch": "nodemon index.js",
  "start:debug": "DEBUG=http* nodemon index.js",
  "test": "jest -i",
  "test:watch": "jest -i --watchAll",
  "test:debug": "DEBUG=http* jest -i",
  "lint": "eslint .",
  "lint:test": "npm run lint && npm test",
  "start-db": "mkdir -p ./data/db && mongod --dbpath ./data/db",
  "stop-db": "killall mongod"
},
```



**Before making RESTFUL requests**
In the terminal, start the server with the *npm run start:watch* command. In another terminal window, start the Mongo DB with the command *npm run start-db*. In a third window, make the CRUD requests, using HHTPie or Postman.

**Accessing each method**
The CRUD operations can be entered from the CLI using a utility like HTTpie. The format is http CRUD method, the localhost:PORT, the route and the the information be send/updated/deleted from storage.

__HTTPie__ command http

__PORT__ In these examples, the PORT=4000.

__Server Endpoints__
*/api/v1/signup*
POST request
the client should pass the username and password in the body of the request
the server should respond with a token (generated using jwt)
the server should respond with 400 Bad Request to a failed request

*/api/signin*
GET request
the client should pass the username and password to the server using a Basic: authorization header
the server should respond with a token for authenticated users
the server should respond with 401 Unauthorized for non-authenticated users


**Running tests**

For testing, add the following set-up to the package.json file.
```
"jest": {
  "setupFiles": [
    "./__test__/lib/jest-setup.js"
  ],
  "verbose": true,
  "testEnvironment": "node",
  "collectCoverage": true,
  "coverageDirectory": "./coverage",
  "coveragePathIgnorePatterns": [
    "/__test__/"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
},
```
From the command line, type *npm run test:watch* to start testing or *npm run test:debug* to use the debug package.

create a test that will ensure that your API returns a status code of 404 for any routes that have not been registered
*/api/v1/signup*
POST - test 400, if no request body has been provided or the body is invalid
POST - test 200, if the request body has been provided and is valid
*/api/v1/signin*
GET - test 401, if the user could not be authenticated
GET - test 200, responds with token for a request with a valid basic authorization header
