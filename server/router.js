const express = require('express');
const db = require('../db');
const path = require('path');

const router = express.Router();

router
  .get('/start', (req, res) => {
    db.initialize();
    res.send(db.boards);
  })
  .get('/draw', (req, res) => {
    const dbRes = db.drawBall();
    if (dbRes.num === undefined) {
      // TODO implement this logic
      res.send({ state: 'game over' });
    } else {
      res.send(dbRes);
    }
  })
  .get('/gameMaster', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src/GM.html'));
  })
  .get('/verify/:id', (req, res) => {
    const player = req.params.id;
    const winner = db.checkWin(player);
    res.send({
      player,
      winner,
    });
  });

module.exports = router;
