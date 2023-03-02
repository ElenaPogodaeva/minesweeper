import React from 'react';
import { ICell } from 'types/types';
import style from './Cell.module.scss';

type CellProps = {
  value: ICell;
  onClick: () => void;
};

export const Cell = ({ value, onClick }: CellProps) => {
  function getValue(value: ICell) {
    if (!value.isOpen) {
      return value.isFlagged ? "🚩" : null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbour === 0) {
      return null;
    }
    return value.neighbour;
  }

  return (
    <div className={style.cell} onClick={onClick} >
      {getValue(value)}
    </div>
  );
};

export default Cell;
