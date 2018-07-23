import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from '../styles/index.css';
import LandingContext from './context/LandingContext';
import GMContext from './context/GMContext';
import Landing from './Landing';
import socketConnection from '../lib/socketSetup';
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

    this.handleNewBall = (ball) => {
      this.setState(({ lastBall, played, playedHash }) => {
        const updatedHash = Object.assign({}, playedHash, { [ball]: true });
        if (lastBall) {
          const history = [...played, lastBall];
          return {
            played: history,
            lastBall: ball,
            playedHash: updatedHash,
          };
        }
        return {
          lastBall: ball,
          playedHash: updatedHash,
        };
      });
    };

    this.draw = () => {
      const { message } = this.state;
      if (message) {
        return;
      }
      drawBall()
        .then((res) => {
          this.handleNewBall(res.data.num);
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

  render() {
    const FourOhFour = () => (
      <h1>
        404
      </h1>);
    const {
      lastBall,
      played,
      draw,
      start,
    } = this.state;
    return (
      <div className={styles.container}>
        <BrowserRouter>
          <Switch>
            <LandingContext.Provider value={this.state}>
              <GMContext.Provider value={{ draw, start }}>
                <Route exact path="/" component={Landing} start={start} />
                <Route path="/gameMaster" component={GM} />
              </GMContext.Provider>
            </LandingContext.Provider>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
