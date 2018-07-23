const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const routes = require('./router');
const controller = require('../db/dbController');

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
// const ws = wss.on('connection', (ws) => {

// })
app.use(express.static(path.resolve(__dirname, '../dist')));

wss.on('connection', (ws) => {
  app.get('/draw', (req, res) => controller.drawBall(req, res, ws));
});

app.use('/', routes);


server.listen(3000, () => console.log('listening on 3000!'))
