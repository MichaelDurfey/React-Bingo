import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/Navbar'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }


  render() {
    return (
    <div>
      <NavBar />
      <div className="container">
        Hello React
      </div>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
