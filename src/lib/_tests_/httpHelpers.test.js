import axios from 'axios';
import fakeBoard from './fakeData';
import { gameStart, verifyWinner, drawBall } from '../httpHelpers';

jest.mock('axios');

describe('gameStart', () => {
  test('gameStart returns correct response', () => {
    const resp = { data: fakeBoard };
    axios.get.mockResolvedValue(resp);
    return gameStart().then((data) => {
      expect(data.data).toEqual(resp.data);
    });
  });

  test('verifyWinner returns correct response', () => {
    const resp = {
      data: {
        player: 'jack',
        winner: false,
      },
    };
    axios.get.mockResolvedValue(resp);
    return verifyWinner().then((data) => {
      expect(data.data).toEqual(resp.data);
    });
  });

  test('drawBall returns correct response', () => {
    const resp = {
      data: { num: 35 },
    };
    axios.get.mockResolvedValue(resp);
    return drawBall().then((data) => {
      expect(data.data).toEqual(resp.data);
    });
  });
});
