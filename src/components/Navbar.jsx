import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Navbar.css';

const number = num => (
  <div className={styles.playedNumber}>
    {num}
  </div>
);

const lastPlayedBall = lastBall => (
  lastBall ? (
    <div className={styles.lastBall}>
      { lastBall }
    </div>
  ) : ''
);

const Navbar = (props) => {
  const { lastBall, played } = props;
  const history = [];
  for (let i = played.length - 1; i >= 0; i -= 1) {
    const cleanedNum = played[i] < 10 ? `0${played[i]}` : played[i].toString();
    history.push(number(cleanedNum));
  }
  return (
    <div className={styles.navBar}>
      <div className={styles.lastBallText}>
            Last Ball:
      </div>
      {
        lastPlayedBall(lastBall)
      }
      <div>
        <div className={styles.playedText}>
          previous balls:
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
