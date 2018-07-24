const express = require('express');
const path = require('path');
const dbControllers = require('../db/dbController');

const router = express.Router();

router
  .get('/start', dbControllers.initialize)
  .get('/gameMaster', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src', 'index.html'));
  })
  .get(/^((?!(\/start|\/draw|\/verify)).)*$/gm, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src', 'index.html'));
  });

module.exports = router;
