import React from 'react';
// import ReactDOM from 'react-dom';
import GMContext from './context/GMContext';
// import { gameStart, drawBall } from '../lib/httpHelpers';
import styles from '../styles/GameMaster.css';

const GameMaster = () => (
  <div className={styles.gameMaster}>
    <GMContext.Consumer>
      {({ draw, start }) => (
        <div>
          <button
            className={styles.button}
            type="button"
            aria-label="draw Ball"
            onClick={() => draw()}
          >
            Draw Ball
          </button>
          <button
            className={styles.button}
            aria-label="Start Game"
            type="button"
            onClick={() => start()}
          >
            Start Game
          </button>
        </div>
      )}
    </GMContext.Consumer>
  </div>
);

export default GameMaster;

// ReactDOM.render(<GameMaster />, document.getElementById('gameMaster'));
