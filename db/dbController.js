const db = require('./index');

async function drawBall(req, res, ws) {
  const ball = await db.drawBall();
  if (ball) {
    ws.send(JSON.stringify(ball))
    return res.send(ball)
  } else {
    return res.status(500).send()
  }
}

module.exports = { drawBall }
