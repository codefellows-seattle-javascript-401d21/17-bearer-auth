# Lab 17: Bearer Authentication

**Author**: Steve Carpenter
**Version**: 1.0.0

## Overview
This is a RESTful HTTP server that utilizes both basic authentication as well
as Bearer tokenized authentication for access to any of its /api/v1/car
routes. It supports the three following route types:
- signup
- signin
- car

## Getting Started
The user needs to do the following to use this RESTful HTTP API:
- Clone the repository from github [here](https://github.com/stevegcarpenter/17-bearer-auth)
- Install all the necessary `npm` packages by executing `npm install` as well as `npm install -D`
- To run the `linter` check execute `npm run lint`
- Alternatively, run `npm run lint:test` to first run the linter and then the test suite

## Architecture
- NodeJS
- npm
- JavaScript

## Change Log
2018-02-06 Moving over code from yesterdays lab
2018-02-07 Renaming the auth test files
2018-02-07 Adding spacing and semicolon
2018-02-07 Removed unnecessary comment
2018-02-07 Adding bearer middleware file
2018-02-07 Adding new Car Model/routes/POST tests
2018-02-07 Adding all working car GET route tests using mocks
2018-02-07 Replaced redundant strings with const var
2018-02-07 Adding valid PUT tests for /api/v1/car route
2018-02-07 Removed unnecessary beforeAll() code
2018-02-07 Removed hard coded strings in favor of faker
2018-02-07 Adding /api/v1/car/:_id DELETE route tests
2018-02-07 Removed unused faker module

## Credits and Collaborations
- [NodeJS](https://nodejs.org)
- [npm](https://www.npmjs.com/)
- [JavaScript](https://www.javascript.com/)
