const calculateBallUpdate = (state, ball) => {
  const { played, playedHash, lastBall } = state;
  const updatedHash = { ...playedHash, ...{ [ball]: true } };
  if (lastBall) {
    const history = [...played, lastBall];
    return {
      ...state,
      played: history,
      lastBall: ball,
      playedHash: updatedHash,
    };
  }
  return {
    ...state,
    lastBall: ball,
    playedHash: updatedHash,
  };
};

export { calculateBallUpdate };
