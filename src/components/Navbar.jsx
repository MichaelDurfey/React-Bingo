import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Navbar.css';

const number = num => (
  <div key={num} className={styles.playedNumber}>
    {num}
  </div>
);

const lastPlayedBall = lastBall => (
  <div className={styles.lastBall}>
    { lastBall }
  </div>
);

const Navbar = (props) => {
  const { lastBall, played } = props;
  const history = [];
  for (let i = played.length - 1; i >= 0; i -= 1) {
    const cleanedNum = played[i] < 10 ? `0${played[i]}` : `${played[i]}`;
    history.push(number(cleanedNum));
  }
  return (
    <div className={styles.navBar}>
      <div className={styles.lastBallText}>
            Last Ball
      </div>
      {
        lastBall ? lastPlayedBall(lastBall) : null
      }
      <div className={styles.playedContainer}>
        <div className={styles.playedText}>
          previous balls
        </div>
        <div className={styles.playedNumbers}>
          { history }
        </div>
      </div>
    </div>
  );
};

export default Navbar;

Navbar.propTypes = {
  lastBall: PropTypes.number,
  played: PropTypes.arrayOf(PropTypes.number),
};

Navbar.defaultProps = {
  lastBall: null,
  played: [],
};
