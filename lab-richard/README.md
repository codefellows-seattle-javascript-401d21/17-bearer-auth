<h1>17-Asset-Management</h1>

Author: Richard Montgomery
Git: montgomeryrd
Version: 1.0.0
Last Modified: 02/09/2018 3:15am

<h2>Server Endpoints</h2>

/api/v1/signup [POST] - Register User: requires username, email, password
/api/v1/signin [GET] - User verification
/api/v1/gallery/ [GET] - Retrieve a list of the galleries
/api/v1/gallery/ [GET] - Retrieve a gallery object
/api/v1/gallery/ [PUT] - Requires id to send a request and update a gallery object
/api/v1/gallery/ [DELETE] - Requires id to delete a gallery object
/api/v1/gallery/ [POST] - Uses the send request to create a gallery object

<h2>Lab README</h2>
![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 17: Bearer Auth
===

## Submission Instructions
  * fork this repository & create a new branch for your work
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Learning Objectives
* students will be able to create bearer authentication middleware
* students will be able to utilize their bearer authentication middleware in their route structures
* students will be able to test against authenticated routes

## Requirements
#### Configuration
* `package.json`
* `.eslintrc.json`
* `.gitignore`
* `.env`
* `README.md`

## Description
* create a bearer auth middleware module (feel free to use the one from lecture as a reference point)
* create a new resource (Schema) that has at least three properties
  * this resource must have a property of `userID` that references the `_id` of the auth model that created the resource
  * the `userID` property can only be set from an `_id` found using your bearer auth middleware module
* as always, use the **npm** `debug` module to log function calls that are used within your application
* using the express `Router`, create routes for doing **RESTFUL CRUD** operations against your resource

## Server Endpoints
### `/api/resource-name`
* `POST` request
* pass data as stringifed JSON in the body of a post request to create a new resource

### `/api/resource-name/:id`
* `GET` request
* pass the id of a resource though the url endpoint to `req.params` to fetch a resource
* `PUT` request
* pass data as stringifed JSON in the body of a put request to update a resource
* `DELETE` request
* pass the id of a resource though the url endpoint *(using `req.params`)* to delete a resource

## Tests
* create a test to ensure that your API returns a status code of 404 for routes that have not been registered
* create a series of tests to ensure that your `/api/resource-name` endpoint responds as described for each condition below:
* `GET` - test **200**, for a request made with a valid id
* `GET` - test **200**, for a request made with no id param
* `GET` - test **401**, if no token was provided
* `GET` - test **404**, for a valid request with an id that was not found
* `PUT` - test **200**, for a post request with a valid body
* `PUT` - test **401**, if no token was provided
* `PUT` - test **400**, if the body was invalid
* `PUT` - test **404**, for a valid request made with an id that was not found
* `POST` - test **200**, for a post request with a valid body
* `POST` - test **401**, if no token was provided
* `POST` - test **400**, if no body was provided or if the body was invalid
* `DELETE` - test **200**, for a post request with a valid body
* `DELETE` - test **401**, if no token was provided
* `DELETE` - test **404**, for a valid request made with an id that was not found
