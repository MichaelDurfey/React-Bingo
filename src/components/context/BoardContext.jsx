import React from 'react';

const BoardContext = React.createContext({
  checkWinner: () => {},
  hash: {},
  player: '',
  board: [],
});

export default BoardContext;
