const express = require('express');
const db = require('../db');

const router = express.Router();

router
  .get('/start', (req, res) => {
    db.initialize();
    res.send(db.boards);
  })
  .get('/verify/:id', (req, res) => {
    const player = req.params.id;
    const winner = db.checkWin(player);
    res.send({
      player,
      winner,
    });
  })
  .get('*', (req, res) => {
    res.send(404);
  });

module.exports = router;
