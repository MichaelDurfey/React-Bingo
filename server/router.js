const express = require('express');
const db = require('../db');

const router = express.Router();

router
  .get('/start', (req, res) => {
    db.initialize();
    res.json(db.boards);
  })
  .get('/draw', (req, res) => {

  })
  .get('/verify:id', () => {

  });

module.exports = router;
