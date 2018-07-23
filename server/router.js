const express = require('express');
const db = require('../db');
const path = require('path');

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
  .get('/gameMaster', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src', 'index.html'));
  });

module.exports = router;
