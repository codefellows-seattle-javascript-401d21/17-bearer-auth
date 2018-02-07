'use strcit';

//APP DEPENDENCIES
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error-handler.js');

//APP SETUP

const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const MONGOD_URI = process.env.MONGODB_URI;

//midleware
app.use(cors());
app.use('/api/v1', router);
require('../route/route-auth.js')(router);
require('../route/route-gallery.js')
app.all('/{0,}', (req, res) => errorHandler(new Error('PAth Error. Route Not Fojund'), res));

//server cosntrol
const server = module.exports = {};
server.start = () => {
  return new Promise((resolve, reject) => {
    if (server.isOn) return reject(new Error('Error Servor is already on. cannot start on same port'));
    server.http = app.listen(PORT, () => {
      console.log(`Listen on ${PORT}`);
      server.isOn = true;
      mongoose.connect(MONGOD_URI);
      return resolve(server);
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) return reject(new Error('Error cannot stop server that is not running'));
    server.http.close(() => {
      server.isOn = false;
      mongoose.disconnect();
      return resolve();
    });
  });
};
