import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Navbar';
import Board from './components/Board';
// import './styles/index.css'
import { gameStart } from './httpHelpers';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
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
    const { boards } = this.state;
    return (
      <div>
        <NavBar />
        <div className="container">
          { boards.map(board => <Board board={board} />) }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// module.hot.accept();
