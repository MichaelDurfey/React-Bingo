import React from 'react';
import BoardMain from './BoardMain';
// import GameMaster from './GameMaster';
import NavBar from './Navbar';
import Message from './Message';
import LandingContext from './context/LandingContext';
import BoardContext from './context/BoardContext';

const Landing = () => (
  <LandingContext.Consumer>
    {data => (
      <div>
        <NavBar lastBall={data.lastBall} played={data.played} />
        <Message message={data.message} />
        <BoardContext.Provider value={data}>
          <BoardMain />
        </BoardContext.Provider>
      </div>
    )}
  </LandingContext.Consumer>
);

export default Landing;
