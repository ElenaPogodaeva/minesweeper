import { ICell } from 'types/types';

export const createBoard = (height: number, width: number) => {
  const board: ICell[][] = [];

  for (let i = 0; i < height; i++) {
    board.push([]);
    for (let j = 0; j < width; j++) {
      board[i][j] = {
        x: i,
        y: j,
        isMine: false,
        neighbour: 0,
        isOpen: false,
        isEmpty: false,
        isFlagged: false,
      };
    }
  }
  return board;
};
