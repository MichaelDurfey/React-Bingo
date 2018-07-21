import React from 'react';
import Board from './Board';
import BoardContext from './context/BoardContext';
import styles from '../styles/BoardMain.css';

const BoardMain = props => (
  <div className={styles.boardBody}>
    <div className={styles.boardMain}>
      <BoardContext.Consumer>
        {({
          boardHashes,
          playedHash,
          matricies,
          lastBall,
        }) => (
          matricies.map((objEntries) => {
            const [player, key, board] = [objEntries[0], objEntries[1][0], objEntries[1]];
            const hash = boardHashes[player];
            return (
              <Board
                {...props}
                hash={hash}
                lastBall={lastBall}
                playedHash={playedHash}
                player={player}
                key={`${key.join('')}`}
                board={board}
              />
            );
          })
        )}
      </BoardContext.Consumer>
    </div>
  </div>
);

export default BoardMain;
