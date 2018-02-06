# Lab 16: Basic auth

This app is an HTTP server that uses express

It uses a Mongo DB with this user model:
username - required and unique
email - required and unique
password - required - this must be hashed and can not stored as plain text
compareHash - unique
timestamps

The server has the following endpoints

/api/signup
POST request
the client should pass the username and password in the body of the request
the server should respond with a token (generated using jwt)
the server should respond with 400 Bad Request to a failed request

/api/signin
GET request
the client should pass the username and password to the server using a Basic: authorization header
the server should respond with a token for authenticated users
the server should respond with 401 Unauthorized for non-authenticated users

To install the app clone the git repository

The dependencies are:
 
bcrypt
body-parser
cors
crypto
dotenv
express
jsonwebtoken
mongoose

Install them using 'npm i' command

The developer dependecies are:

jest
superagent
debug
faker

To install: NPM i -D 'dependency name'.
To get debug messages use: npm run start:debug

To start Mogono DB: mongod --dbpath ./data/db

To start server: npm run start:watch

Use Postman or httpie to make a request.

Below are sample requests and responses using httpie:

http POST :3000/api/v1/signup username=Hulk email='hulk@m.com' password=okies

HTTP/1.1 201 Created
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 207
Content-Type: application/json; charset=utf-8
Date: Tue, 06 Feb 2018 01:30:02 GMT
ETag: W/"cf-YLvO0zlsoD3sa2Wwm8oz27Q9nR4"
X-Powered-By: Express

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI1NjZmZTFhN2U2NTc2NjIzODdmZjBiYzAyNTFhYzYzMDA0NjM3MmYxMGY5MWVhNWFlMTE1MzNlZjRlY2VlZGMiLCJpYXQiOjE1MTc4ODA2MDJ9.umAyc_IP5E2XTkmvC63zIOD9JLVnYHhyrSXVbfU_4k8"

Colloaorator(s):
Jesus