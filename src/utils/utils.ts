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
        flagIndex: 0,
      };
    }
  }
  return board;
};

export const generateRandomMines = (
  data: ICell[][],
  height: number,
  width: number,
  mines: number
) => {
  let randomX,
    randomY,
    minesCount = 0;

  while (minesCount < mines) {
    randomX = Math.floor(Math.random() * width);
    randomY = Math.floor(Math.random() * height);
    if (!data[randomX][randomY].isMine) {
      data[randomX][randomY].isMine = true;
      minesCount++;
    }
  }

  return data;
};

export const getNeighbours = (
  x: number,
  y: number,
  data: ICell[][],
  height: number,
  width: number
) => {
  const neighbors: ICell[] = [];
  //up
  if (x > 0) {
    neighbors.push(data[x - 1][y]);
  }
  //down
  if (x < height - 1) {
    neighbors.push(data[x + 1][y]);
  }
  //left
  if (y > 0) {
    neighbors.push(data[x][y - 1]);
  }
  //right
  if (y < width - 1) {
    neighbors.push(data[x][y + 1]);
  }
  // top left
  if (x > 0 && y > 0) {
    neighbors.push(data[x - 1][y - 1]);
  }
  // top right
  if (x > 0 && y < width - 1) {
    neighbors.push(data[x - 1][y + 1]);
  }
  // bottom right
  if (x < height - 1 && y < width - 1) {
    neighbors.push(data[x + 1][y + 1]);
  }
  // bottom left
  if (x < height - 1 && y > 0) {
    neighbors.push(data[x + 1][y - 1]);
  }
  return neighbors;
};

export const countNeighboursMines = (data: ICell[][], height: number, width: number) => {
  const updatedData = data;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const currentCell = data[i][j];
      if (!currentCell.isMine) {
        let minesCount = 0;
        const area = getNeighbours(i, j, data, height, width);

        area.map((item) => {
          if (item.isMine) {
            minesCount += 1;
          }
        });

        if (minesCount === 0) {
          updatedData[i][j].isEmpty = true;
        }
        updatedData[i][j].neighbour = minesCount;
      }
    }
  }

  return updatedData;
};

export const initBoardData = (height: number, width: number, mines: number) => {
  const board = createBoard(height, width);
  const boardWithMines = generateRandomMines(board, height, width, mines);
  const boardWithNumbers = countNeighboursMines(boardWithMines, height, width);

  return boardWithNumbers;
};

export const showBoard = (data: ICell[][]) => {
  const updatedData = data;
  updatedData.map((row) =>
    row.map((cell) => {
      cell.isOpen = true;
    })
  );
  return updatedData;
};

export const getHidden = (data: ICell[][]) => {
  const hiddenCells: ICell[] = [];

  data.map((datarow) => {
    datarow.map((dataitem) => {
      if (!dataitem.isOpen) {
        hiddenCells.push(dataitem);
      }
    });
  });

  return hiddenCells;
};

export const showEmptyCells = (
  height: number,
  width: number,
  x: number,
  y: number,
  data: ICell[][]
) => {
  const neighbours = getNeighbours(x, y, data, height, width);
  neighbours.map((cell) => {
    if (!cell.isOpen && (cell.isEmpty || !cell.isMine)) {
      data[cell.x][cell.y].isOpen = true;
      if (cell.isEmpty) {
        showEmptyCells(height, width, cell.x, cell.y, data);
      }
    }
  });
  return data;
};
