import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from './Board';
import styles from '../styles/BoardMain.css';

const BoardMain = ({
  boards,
  boardHashes,
}) => (
  <div className={styles.boardBody}>
    <div className={styles.boardMain}>
      {
        Object.entries(boards).map((objEntries) => {
          const [player, key, board] = [objEntries[0], objEntries[1][0], objEntries[1]];
          const playerBoardHash = boardHashes[player];
          return (
            <Board
              key={`${key.join('')}`}
              playerBoardHash={playerBoardHash}
              player={player}
              board={board}
            />
          );
        })
      }
    </div>
  </div>
);

const mapStateToProps = state => ({
  boards: state.boards,
  boardHashes: state.boardHashes,
});

export default connect(mapStateToProps)(BoardMain);

BoardMain.propTypes = {
  boards: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.Number)).isRequired,
  boardHashes: PropTypes.objectOf(PropTypes.number).isRequired,
};
