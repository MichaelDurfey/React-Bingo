const db = require('./index');

function broadcast(data, ws, wss, WebSocket) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  })
};

async function initialize(req, res) {
  await db.initialize();
  const boards = db.boards;
  if (boards) {
    return res.send(boards);
  }
    return res.sendStatus(500);
};

async function drawBall(req, res, ws, wss, WebSocket) {
  const ball = await db.drawBall();
  if (ball) {
    if (ws.readyState === WebSocket.OPEN ) {
      ws.send(JSON.stringify(ball));
      broadcast(ball, ws, wss, WebSocket);
    }
    return res.send(ball);
  }
    return res.sendStatus(500);
};

async function checkWin(req, res, ws, wss, WebSocket) {
  const player = req.params.id;
  const winner = await db.checkWin(player);
  if (winner !== undefined) {
    const response = { player, winner };
    if (winner === true && ws.readyState === WebSocket.OPEN ) {
      ws.send(JSON.stringify(response));
      broadcast(response, ws, wss, WebSocket);
    }
   return res.send(response);
  } 
  return res.sendStatus(500);
};

module.exports = { drawBall, checkWin, initialize, broadcast }
