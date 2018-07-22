import React from 'react';
import ReactDOM from 'react-dom';
import { gameStart, drawBall } from '../lib/httpHelpers';
import styles from '../styles/GameMaster.css';

const GameMaster = () => (
  <div className={styles.gameMaster}>
    <button
      className={styles.button}
      type="button"
      aria-label="draw Ball"
      onClick={() => drawBall()}
    >
      Draw Ball
    </button>
    <button
      className={styles.button}
      aria-label="Start Game"
      type="button"
      onClick={() => gameStart()}
    >
      Start Game
    </button>
  </div>
);

export default GameMaster;

ReactDOM.render(<GameMaster />, document.getElementById('gameMaster'));
