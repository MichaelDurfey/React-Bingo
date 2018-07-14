import axios from 'axios';

const gameStart = () => axios.get('/start');

const checkWinner = id => axios.get(`/verify${id}`);

const drawBall = () => axios.get(`/draw`)

module.exports = { gameStart, checkWinner, drawBall };
