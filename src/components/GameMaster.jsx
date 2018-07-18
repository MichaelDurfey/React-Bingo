import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/GameMaster.css';

const GameMaster = (props) => {
  const { drawBall, startGame } = props;
  return (
    <div className={styles.gameMaster}>
      <button type="button" onClick={() => drawBall()}>
        Draw Ball
      </button>
      <button type="button" onClick={() => startGame()}>
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
