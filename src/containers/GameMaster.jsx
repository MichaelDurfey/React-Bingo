import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/GameMaster.css';
import { requestBall } from '../actions';

const GameMaster = ({ draw }) => {
  return (
    <div className={styles.container}>
      <h1>Welcome, GameMaster!</h1>
      <div className={styles.gameMaster}>
        <button
          className={styles.button}
          type="button"
          aria-label="draw Ball"
          onClick={() => draw()}
        >
          Draw Ball
        </button>
        {/* <button
          className={styles.button}
          aria-label="Start Game"
          type="button"
          onClick={() => start()}
        >
          Start Game
        </button> */}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  // start: () => {
  //   dispatch(requestStart());
  // },
  draw: () => {
    dispatch(requestBall());
  }
});

export default connect(() => ({}), mapDispatchToProps)(GameMaster);

GameMaster.propTypes = {
  draw: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
};
