import React from 'react';
import Board from './Board';
import BoardContext from './context/BoardContext';
import styles from '../styles/BoardMain.css';

const BoardMain = () => (
  <div className={styles.boardBody}>
    <div className={styles.boardMain}>
      <BoardContext.Consumer>
        {({
          boards,
          boardHashes,
          playedHash,
          lastBall,
          checkWinner,
        }) => {
          const matricies = Object.entries(boards);
          return matricies.map((objEntries) => {
            const [player, key, board] = [objEntries[0], objEntries[1][0], objEntries[1]];
            const hash = boardHashes[player];
            return (
              <Board
                checkWinner={checkWinner}
                hash={hash}
                lastBall={lastBall}
                playedHash={playedHash}
                player={player}
                key={`${key.join('')}`}
                board={board}
              />
            );
          });
        }}
      </BoardContext.Consumer>
    </div>
  </div>
);

export default BoardMain;
