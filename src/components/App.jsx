import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './Navbar';
import styles from '../styles/index.css';
import LandingContext from './context/LandingContext';
import GMContext from './context/GMContext';
import Landing from './Landing';
import GM from './GM';
import { gameStart, drawBall, verifyWinner } from '../lib/httpHelpers';

function buildBoardHashes(board) {
  const boardHashes = Object.entries(board)
    .reduce((acc, entry) => {
      acc[entry[0]] = entry[1]
        .reduce((arr, curr) => arr.concat(curr))
        .reduce((hash, curr) => ({ ...hash, [curr]: true }), {});
      return acc;
    }, {});
  return boardHashes;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.start = () => {
      const { message } = this.state;
      if (message) {
        return;
      }
      gameStart()
        .then((res) => {
          const boardHashes = buildBoardHashes(res.data);
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
    };

    this.draw = () => {
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
    };

    this.checkWinner = (id) => {
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
    };

    this.state = {
      boards: [],
      lastBall: 0,
      played: [],
      playedHash: {},
      boardHashes: {},
      message: '',
      draw: this.draw,
      start: this.start,
      checkWinner: this.checkWinner,
    };
  }

  componentDidMount() {
    this.start();
  }

  render() {
    const {
      lastBall,
      played,
      draw,
      start,
    } = this.state;
    return (
      <div className={styles.container}>
        <NavBar lastBall={lastBall} played={played} />
        <BrowserRouter>
          <Switch>
            <LandingContext.Provider value={this.state}>
              <GMContext.Provider value={{ draw, start }}>
                <Route exact path="/" component={Landing} />
                <Route exact path="/gameMaster" component={GM} />
              </GMContext.Provider>
            </LandingContext.Provider>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
