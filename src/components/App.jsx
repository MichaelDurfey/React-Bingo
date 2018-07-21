import React from 'react';
import NavBar from './Navbar';
import BoardContext from './context/BoardContext';
import BoardMain from './BoardMain';
import GameMaster from './GameMaster';
import styles from '../styles/index.css';
import Message from './Message';
import { gameStart, drawBall, verifyWinner } from '../lib/httpHelpers';

function buildPlayerHashes(board) {
  const playerHashes = Object.entries(board)
    .reduce((acc, entry) => {
      acc[entry[0]] = entry[1]
        .reduce((arr, curr) => arr.concat(curr))
        .reduce((hash, curr) => {
          hash[curr] = true;
          return hash;
        }, {});
      return acc;
    }, {});
  return playerHashes;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      lastBall: 0,
      played: [],
      playedHash: {},
      playerHashes: {},
      message: '',
    };
  }

  componentDidMount() {
    this.start();
  }

  start() {
    gameStart()
      .then((res) => {
        const playerHashes = buildPlayerHashes(res.data);
        this.setState(() => ({
          boards: res.data,
          lastBall: 0,
          played: [],
          playerHashes,
          playedHash: {},
          message: '',
        }),
        () => {
          this.draw();
        });
      });
  }

  draw() {
    drawBall()
      .then((res) => {
        this.setState(({ lastBall, played, playedHash }) => {
          const updatedHash = Object.assign({}, playedHash, { [res.data.num]: true });
          if (lastBall) {
            const history = [...played, lastBall];
            return {
              played: history,
              lastBall: res.data.num,
              playedHash: updatedHash,
            };
          }
          return {
            lastBall: res.data.num,
            playedHash: updatedHash,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkWinner(id) {
    verifyWinner(id)
      .then((res) => {
        const { player, winner } = res.data;
        const { message } = this.state;
        if (!message && winner) {
          this.setState(
            () => ({
              message: `${player.toUpperCase()} HAS WON!`,
            }),
            () => {
              setTimeout(() => {
                this.setState({ message: '' });
                this.start();
              }, 4000);
            }
          );
        } else if (!message) {
          this.setState(
            () => ({ message: 'No winner found yet!' }),
            () => setTimeout(() => { this.setState({ message: '' }); }, 4000)
          );
        }
      });
  }

  render() {
    const {
      boards,
      lastBall,
      played,
      playerHashes,
      playedHash,
      message,
    } = this.state;
    const className = message ? styles.messageShown : styles.messageHidden;
    const matricies = Object.entries(boards);

    return (
      <div className={styles.container}>
        <NavBar lastBall={lastBall} played={played} />
        <GameMaster startGame={() => this.start()} drawBall={() => this.draw()} />
        <Message message={message} className={className} />
        <BoardContext.Provider
          value={{
            playerHashes,
            playedHash,
            matricies,
            lastBall,
          }}
        >
          <BoardMain checkWinner={player => this.checkWinner(player)} />
        </BoardContext.Provider>
      </div>
    );
  }
}

export default App;
