import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Navbar';
import Board from './components/Board';
import GameMaster from './components/GameMaster';
import styles from './styles/index.css';
import { gameStart, drawBall, verifyWinner } from './httpHelpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      lastBall: 0,
      played: [],
      hash: {},
      winner: null,
      message: null,
    };
  }

  componentDidMount() {
    this.start();
  }

  start() {
    gameStart()
      .then((res) => {
        this.setState(() => ({
          boards: res.data,
          lastBall: 0,
          played: [],
          hash: {},
          winner: null,
          message: null,
        }),
        () => {
          this.draw();
        });
      });
  }

  draw() {
    drawBall()
      .then((res) => {
        this.setState(({ lastBall, played, hash }) => {
          const updatedHash = Object.assign({}, hash, { [res.data.num]: true });
          if (lastBall) {
            const history = played.slice();
            history.push(lastBall);
            return {
              played: history,
              lastBall: res.data.num,
              hash: updatedHash,
            };
          }
          return {
            lastBall: res.data.num,
            hash: updatedHash,
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
        if (winner) {
          this.setState({
            winner: player,
            message: `${player.toUpperCase()} HAS WON!`
          });
        } else {
          this.setState({
            message: 'No winner found yet!',
          });
        }
      });
  }

  render() {
    const {
      boards,
      lastBall,
      played,
      hash,
      message,
      winner,
    } = this.state;
    const matricies = Object.entries(boards);
    const winnerFound = () => (
      winner ? (
        <div>
          { message }
        </div>
      ) : false
    );

    const renderBoards = () => (
      <div className={styles.boardMain}>
        { matricies.map(board => (
          <Board
            onClick={id => this.checkWinner(id)}
            hash={hash}
            message={message}
            player={board[0]}
            key={`${board[1][0].join('')}`}
            board={board[1]}
          />))
        }
      </div>
    );

    return (
      <div className={styles.container}>
        <NavBar lastBall={lastBall} played={played} />
        <GameMaster startGame={() => this.start()} drawBall={() => this.draw()} />
        { !winnerFound() && renderBoards() }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


if (module.hot) {
  module.hot.accept();
}
