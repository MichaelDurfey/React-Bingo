const express = require('express');
const db = require('../db');

const router = express.Router();

router
  .get('/start', (req, res) => {
    db.initialize();
    res.send(db.boards);
  })
  .get('/draw', (req, res) => {
    const dbRes = db.drawBall();
    if (dbRes.num === undefined) {
      res.send({ state: 'game over' });
    } else {
      res.send(dbRes);
    }
  })
  .get('/verify:id', () => {

  });

module.exports = router;

