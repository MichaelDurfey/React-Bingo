import axios from 'axios';

const gameStart = () => axios.get('/start');

const verifyWinner = id => axios.get(`/verify/${id}`);

const drawBall = () => axios.get('/draw');

export { gameStart, verifyWinner, drawBall };
