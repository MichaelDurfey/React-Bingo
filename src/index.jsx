import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Navbar';
import Board from './components/Board';
import GameMaster from './components/GameMaster';
import styles from './styles/index.css';
import { gameStart, drawBall } from './httpHelpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      lastBall: 0,
      played: [],
    };
  }

  componentDidMount() {
    this.start();
  }

  start() {
    gameStart()
      .then((res) => {
        const matrices = Object.values(res.data);
        this.setState(() => ({
          boards: matrices,
        }),
        () => {
          this.draw();
        });
      });
  }

  draw() {
    drawBall()
      .then((res) => {
        this.setState(({ lastBall, played }) => {
          if (lastBall) {
            const history = played.slice();
            history.push(lastBall);
            return {
              played: history,
              lastBall: res.data.num,
            };
          }
          return { lastBall: res.data.num };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { boards, lastBall, played } = this.state;
    return (
      <div className={styles.container}>
        <NavBar lastBall={lastBall} played={played} />
        <GameMaster startGame={() => this.start()} drawBall={() => this.draw()} />
        <div className={styles.boardContainer}>
          { boards.map(board => <Board key={board[0].toString()} board={board} />) }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// module.hot.accept();
