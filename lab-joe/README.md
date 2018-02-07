Joe Waine - LAB 17

This lab was a great study on JWT.

I am using jest to send encrypted resources on

GET PUT POST DELETE methods, writing tests for all of them

Bcrypt is used to hash passwords
Body parser acts as a middleware to parse requests in api transmissions
Cors is a Cross origin Resource Service to help with serving from multiple origins.
Dotenv helps establish our environment variables. these shouldnt be pushed. they are included in the .gitignore
express is our api framework to help with routing.
json web token creates a three part json object to securely transmit data in a small format.
mongoose is the mongo wrapper for node.




From the lab starter readme:
Server Endpoints
/api/resource-name
POST request
pass data as stringifed JSON in the body of a post request to create a new resource
/api/resource-name/:id
GET request
pass the id of a resource though the url endpoint to req.params to fetch a resource
PUT request
pass data as stringifed JSON in the body of a put request to update a resource
DELETE request
pass the id of a resource though the url endpoint (using req.params) to delete a resource
Tests
create a test to ensure that your API returns a status code of 404 for routes that have not been registered
create a series of tests to ensure that your /api/resource-name endpoint responds as described for each condition below:
GET - test 200, for a request made with a valid id
GET - test 200, for a request made with no id param
GET - test 401, if no token was provided
GET - test 404, for a valid request with an id that was not found
PUT - test 200, for a post request with a valid body
PUT - test 401, if no token was provided
PUT - test 400, if the body was invalid
PUT - test 404, for a valid request made with an id that was not found
POST - test 200, for a post request with a valid body
POST - test 401, if no token was provided
POST - test 400, if no body was provided or if the body was invalid
DELETE - test 200, for a post request with a valid body
DELETE - test 401, if no token was provided
DELETE - test 404, for a valid request made with an id that was not found
