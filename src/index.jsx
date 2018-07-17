import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Navbar';
import Board from './components/Board';
import styles from './styles/index.css';
import { gameStart } from './httpHelpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      lastBall: 55,
      played: [1, 2, 3, 4, 5],
    };
  }

  componentDidMount() {
    gameStart()
      .then((data) => {
        const matrices = Object.values(data.data);
        this.setState({
          boards: matrices,
        });
      });
  }

  render() {
    const { boards, lastBall, played } = this.state;
    return (
      <div className={styles.container}>
        <NavBar lastBall={lastBall} played={played} />
        <div className={styles.boardContainer}>
          { boards.map(board => <Board key={board[0].toString()} board={board} />) }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// module.hot.accept();
