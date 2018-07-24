import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Navbar.css';

const NumberElem = num => (
  <div key={num} className={styles.playedNumber}>
    {num}
  </div>
);

const LastPlayedBall = lastBall => (
  <div className={styles.lastBall}>
    { lastBall }
  </div>
);

class NavBar extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { lastBall } = this.props;
    if (!lastBall || lastBall !== nextProps.lastBall) {
      return true;
    }
    return false;
  }

  render() {
    const { lastBall, played } = this.props;
    const history = [];
    const length = played.length - 1;
    let end = 0;
    if (length > 15) {
      end = length - 15;
    }
    for (let i = length; i >= end; i -= 1) {
      const cleanedNum = played[i] < 10 ? `0${played[i]}` : `${played[i]}`;
      history.push(NumberElem(cleanedNum));
    }
    return (
      <div className={styles.navBar}>
        <div className={styles.lastBallText}>
              Last Ball
        </div>
        {
          lastBall ? LastPlayedBall(lastBall) : null
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
  }
}

export default NavBar;

NavBar.propTypes = {
  lastBall: PropTypes.number,
  played: PropTypes.arrayOf(PropTypes.number),
};

NavBar.defaultProps = {
  lastBall: null,
  played: [],
};
