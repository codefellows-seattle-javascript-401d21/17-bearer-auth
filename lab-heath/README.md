
# LAB 16: Basic Auth


### Installing and How to use.

To install this program, place fork and 'git clone' this repo to your computer. From the terminal, navigate to  `lab-heath`. once there, install NPM but typing in , `nmp install` and httpie(done with home) after that you need to install cors, express, body-parser, dotenv, faker,jsonwebtoken, mongoose, bcrypt `npm i`. for devolper Dependencies are superagent jest eslint do these with `npm i -D` you also need to have HTTPIE installed via homebrew `brew install httpie` in the terminal. this will let you do the helpful commands inside of the terminal.



next you need to have these scripts adjusted in your package.json file.

```javascript
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

from there, you can go to your terminal and type, 

```javascript
node run start
```
and this will start up your server, if you do `npn run start:watch`, this will let you see it in your localhost in your browser.

you will also need to start up your mongoDB also with the code below on a diffferent termail

```javascript
node run start-db
```

### some helpful commands  

these are you basic commands 

to sign up to the database
```javascript
http POST :3000/api/v1/signup username=tim email='tim@blah.com' password=stuff
```

this should return this 

```javascript
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVmNGRjYzVlNjBlMTM2OWQ2ZGQ3NzQ5MmM3MDI5ZWQ3MmE3M2NkODlkNzBmZDVkNzdmOGEzOTU1MTAwMzE2YjMiLCJpYXQiOjE1MTc4ODE2MTN9.k3qz85cMxjTzAFsNFFptNkOwhQYW5eGWLZm-XGl6J_Q"

```

you can also sign in with this command
```javascript
http -a tim:stuff :3000/api/v1/signin
```

and look like this 
```javascript

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU4MjhjNDdiMmU0OGEyODVmYWZmMmIyMGVhOTc5ZjNmOWE0YTJhOTM3YWY5ZmI2NjZhNmNlMTVjYmQ1NWJmNzkiLCJpYXQiOjE1MTc4ODE2NDR9.Zap5cs7r4xG81CaHj819m7ELLNAce5yV16Hwg-QoRoE"
```
what this is doing is making sure we are not sending our password and user name around the server and database and we keep it secure. this is why you should get this type of data back.

### Testing

Frist we tested the sign up and we do that by creating an user and then we pass in into the database with a superagent POST call. after that, we log the response and we test what we see.

#### code for this part
```javascript
describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(base)
        .send(new User({
          username: faker.name.firstName(),
          password: faker.name.lastName(),
          email: faker.internet.email(),
        }))
        .then(res => this.response = res);
    });
  });
```

#### test for POST vaild

test 1: we are seeing if we get the right response code back.

```javascript
it('should respond with a status of 201', () => {
    expect(this.response.status).toBe(201);
  });
  ```

  test 2: checking to make sure that the user we sent back has all 3 mando items.

  ```javascript
  it('should post a new note with username and password and email', () => {
    expect(this.response.request._data).toHaveProperty('username');
    expect(this.response.request._data).toHaveProperty('password');
    expect(this.response.request._data).toHaveProperty('email');
  });
  ```

#### test for POST invaild

test 3: making sure we send a 404 status code if the wrong path is given.

```javascript
it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesNotExist')
        .send(new User({
          username: faker.name.firstName(),
          password: faker.name.lastName(),
          email: faker.internet.email(),
        }))
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  ```

  test 4: checking to make sure that the user we sent back has all 3 mando items if not, send a 400 status code.

  ```javascript
    it('should return a status 400 on bad request body', () => {
      return superagent.post(base)
        .send(new User({
          username: '',
          password: faker.name.lastName(),
          email: faker.internet.email(),
        }))
        .catch(err => expect(err.status).toBe(400));
    });
```

#### test for GET vaild
frist thing we did we create a user and then we send them into the data base witha superagent POST and then we do a superagent GET to see what data we get back and we test of that data.

#### code for this part
```javascript
 describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(signup)
        .send(new User({
          username: faker.name.firstName(),
          password: faker.name.lastName(),
          email: faker.internet.email(),
        }))
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(base)
            .auth(this.response.request._data.username, this.response.request._data.password)
            .then(res => this.test = res);
        });
    });
  });
```

test 1: we are seeing if we get the right response code back. in this case it should be a 200 status for the get.

```javascript
 it('should respond with a status of 200', () => {
    expect(this.test.status).toBe(200);
  });
  ```

#### test for GET invaild

  test 2: in out .auth we send in bad data, which is wrong username and password then the one we sent back, now we should get a 401 status code in a catch block.

  ```javascript
 it('should get a 401 if the user could not be authenticated', () => {
    return superagent.get(base)
      .auth('jogn', 'hello')
      .catch(err => {
        expect(err.status).toBe(401);
      });
  });
  ```