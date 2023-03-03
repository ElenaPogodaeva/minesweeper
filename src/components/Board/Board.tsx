import Cell from 'components/Cell/Cell';
import React, { useState } from 'react';
import { ICell } from 'types/types';
import { getHidden, initBoardData, showBoard, showEmptyCells } from 'utils/utils';
import style from './Board.module.scss';
import { WIDTH, HEIGHT, MINES_COUNT } from 'utils/constants';

type BoardProps = {
  gameStatus: string;
  setGameStatus: (value: string) => void;
};

export const Board = ({ gameStatus, setGameStatus }: BoardProps) => {
  const [width, setWidth] = useState(WIDTH);
  const [height, setHeight] = useState(HEIGHT);
  const [mines, setMines] = useState(MINES_COUNT);
  const [grid, setGrid] = useState<ICell[][]>(() => initBoardData(height, width, mines));

  function handleLeftClick(x: number, y: number) {
    if (grid[x][y].isOpen || grid[x][y].flagIndex || gameStatus !== 'game') {
      return;
    }

    let updatedGrid = grid;
    console.log(updatedGrid);
    if (updatedGrid[x][y].isMine) {
      const openedGrid = showBoard(updatedGrid);
      setGrid(openedGrid);
      setGameStatus('lose');
      return;
    }

    updatedGrid[x][y].isOpen = true;

    if (updatedGrid[x][y].isEmpty) {
      updatedGrid = showEmptyCells(height, width, x, y, updatedGrid);
    }

    if (getHidden(updatedGrid).length === mines) {
      const openedGrid = showBoard(updatedGrid);
      setGrid(openedGrid);
      setMines(0);
      setGameStatus('win');
      return;
    }

    setGrid(updatedGrid);
  }

  function handleRightClick(e: React.MouseEvent<HTMLElement>, x: number, y: number) {
    e.preventDefault();
    console.log(x, y);
    if (grid[x][y].isOpen || gameStatus !== 'game') {
      return;
    }

    let minesCount = mines;
    const updatedGrid = grid;

    updatedGrid[x][y].flagIndex =
      updatedGrid[x][y].flagIndex === 2 ? 0 : updatedGrid[x][y].flagIndex + 1;

    if (updatedGrid[x][y].flagIndex === 1) {
      minesCount -= 1;
    } else if (updatedGrid[x][y].flagIndex === 2) {
      minesCount += 1;
    }

    console.log(updatedGrid[x][y].flagIndex);
    setMines(minesCount);
    setGrid(updatedGrid);
  }

  return (
    <div className={style.board}>
      {grid.map((row) =>
        row.map((gridCell) => (
          <Cell
            key={gridCell.x * row.length + gridCell.y}
            value={gridCell}
            onLClick={() => handleLeftClick(gridCell.x, gridCell.y)}
            onRClick={(e: React.MouseEvent<HTMLElement>) =>
              handleRightClick(e, gridCell.x, gridCell.y)
            }
          />
        ))
      )}
    </div>
  );
};

export default Board;
