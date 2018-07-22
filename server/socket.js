const WebSocket = require('ws');
const db = require('../db');

const wss = new WebSocket.Server({ port: 8989 });

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (ws) => {
  db.initialize();
  ws.on('message', (data) => {
    const request = JSON.parse(data);
    if (request.type === 'drawBall') {
      const response = db.drawBall();
      ws.send(JSON.stringify(response));
      broadcast(response, ws);
    } else if (request.type === 'verify') {
      const winner = db.checkWin(request.player);
      ws.send(JSON.stringify({
        player: request.player,
        winner,
      }));
      broadcast(response, ws);
    }
  });
  ws.on('close', () => {
    broadcast('close!')
  })
});