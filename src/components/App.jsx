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
      boardHashes: {},
      message: '',
    };
  }

  componentDidMount() {
    this.start();
  }

  start() {
    const { message } = this.state;
    if (message) {
      return;
    }
    gameStart()
      .then((res) => {
        const boardHashes = buildPlayerHashes(res.data);
        this.setState(() => ({
          boards: res.data,
          lastBall: 0,
          played: [],
          boardHashes,
          playedHash: {},
          message: '',
        }),
        () => {
          this.draw();
        });
      });
  }

  draw() {
    const { message } = this.state;
    if (message) {
      return;
    }
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
    const { message } = this.state;
    if (message) {
      return;
    }
    verifyWinner(id)
      .then((res) => {
        const { player, winner } = res.data;
        if (winner) {
          this.setState(
            () => ({
              message: `${player.toUpperCase()} HAS WON!`,
            }),
            () => {
              setTimeout(() => {
                this.setState({ message: '' });
                this.start();
              }, 2000);
            }
          );
        } else {
          this.setState(
            () => ({ message: 'No winner found yet!' }),
            () => setTimeout(() => { this.setState({ message: '' }); }, 2000)
          );
        }
      });
  }

  render() {
    const {
      boards,
      lastBall,
      played,
      boardHashes,
      playedHash,
      message,
    } = this.state;
    const matricies = Object.entries(boards);
    return (
      <div className={styles.container}>
        <NavBar lastBall={lastBall} played={played} />
        <GameMaster startGame={() => this.start()} drawBall={() => this.draw()} />
        <Message message={message} />
        <BoardContext.Provider
          value={{
            boardHashes,
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
