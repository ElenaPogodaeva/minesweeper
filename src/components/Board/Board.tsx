import Cell from 'components/Cell/Cell';
import React from 'react';
import style from './Board.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { leftClick, rightClick } from 'redux/reducers/gameSlice';

export const Board = () => {
  const { grid } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  function handleLeftClick(x: number, y: number) {
    dispatch(leftClick({ x, y }));
  }

  function handleRightClick(e: React.MouseEvent<HTMLElement>, x: number, y: number) {
    e.preventDefault();
    dispatch(rightClick({ x, y }));
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
