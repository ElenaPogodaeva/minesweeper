import Board from 'components/Board/Board';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React from 'react';
import { resetGame } from 'redux/reducers/gameSlice';
import style from './Game.module.scss';

export const Game = () => {
  const { mines, gameState } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  return (
    <div className={style.game}>
      <Board />
    </div>
  );
};

export default Game;
