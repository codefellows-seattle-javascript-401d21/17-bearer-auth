## 16 Basic Auth

Basic Authorization Middleware - Signup, Signin

## Usage

git clone this repo in your desired location
```
git clone <this repo's clone ssh>
```
install dependencies
```
npm install
```
start server
```
node index.js
```

### `/api/v1/

##### `POST /signup` request

<Valid request>
  * pass username, password, email as stringified JSON in the request body of a **POST** request to register and authorize a user
  * this should return a 201 status code with token returned

<Invalid request>
  * If no username and/or no password is/are sent, it rejects and throws an error with a 400 status
  * If route is not correct, it rejects and throws an error with a status 404

##### `GET /signin` request

<Valid request>
  * pass username and password in http headers of **GET** request to verify a user
  * this should return a 200 status code with token returned

<Invalid request>
  * If no username and/or no password is/are sent, it rejects and throws an error with a status 401
  * If route is not correct, it rejects and throws an error with a status 404

