import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Navbar';
import Board from './components/Board';
// import './styles/index.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    // beginGame()
  }

  render() {
    return (
    <div>
      <NavBar />
      <div className="container">
        <Board size={5} />
      </div>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// module.hot.accept();
