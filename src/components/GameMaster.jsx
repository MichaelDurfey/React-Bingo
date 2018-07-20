import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/GameMaster.css';

const GameMaster = (props) => {
  const { drawBall, startGame } = props;
  return (
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
        onClick={() => startGame()}
      >
        Start Game
      </button>
    </div>
  );
};

export default GameMaster;

GameMaster.propTypes = {
  drawBall: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};
