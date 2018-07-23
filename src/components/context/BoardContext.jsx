import React from 'react';

const BoardContext = React.createContext({
  playerHashes: {},
  playedHash: '',
  matricies: [],
  lastBall: 0,
});

export default BoardContext;
