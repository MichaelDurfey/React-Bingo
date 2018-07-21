import React from 'react';

const BoardContext = React.createContext({
  checkWinner: () => {},
  playerHashes: {},
  playedHash: '',
  matricies: [],
  lastBall: 0,
});

export default BoardContext;
